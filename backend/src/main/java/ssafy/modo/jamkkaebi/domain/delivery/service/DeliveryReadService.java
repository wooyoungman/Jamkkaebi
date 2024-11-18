package ssafy.modo.jamkkaebi.domain.delivery.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.tmap.exception.RouteSerializationException;
import ssafy.modo.jamkkaebi.common.util.CommonDateUtil;
import ssafy.modo.jamkkaebi.domain.cargo.entity.Cargo;
import ssafy.modo.jamkkaebi.domain.delivery.dto.response.DeliveryDetailResponseDto;
import ssafy.modo.jamkkaebi.domain.delivery.entity.Delivery;
import ssafy.modo.jamkkaebi.domain.delivery.respository.DeliveryRepository;
import ssafy.modo.jamkkaebi.domain.manager.dto.response.ReportResponseDto;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.route.entity.Route;
import ssafy.modo.jamkkaebi.domain.route.repository.RouteRepository;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static ssafy.modo.jamkkaebi.domain.manager.dto.response.ReportResponseDto.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeliveryReadService {

    private final DeliveryRepository deliveryRepository;
    private final RouteRepository routeRepository;
    private final CommonDateUtil commonDateUtil;

    public boolean isCargoDispatched(Long cargoId) {
        return deliveryRepository.isCargoDispatched(cargoId);
    }

    public DeliveryDetailResponseDto getDeliveryDetail(Delivery delivery) {

        Member driver = delivery.getVehicle().getDriver();
        Cargo cargo = delivery.getCargo();
        Route route = routeRepository.findById(delivery.getCargo().getRouteId())
                .orElseThrow(RouteSerializationException::new);

        return DeliveryDetailResponseDto.builder()
                .deliveryId(delivery.getId())
                .driverId(driver.getId())
                .driverName(driver.getName())
                .routeId(route.getId())
                .cargoId(cargo.getId())
                .origin(cargo.getOrigin())
                .destination(cargo.getDestination())
                .length(route.getRouteInfo().getFeatures().get(0).getProperties().getTotalDistance())
                .departureDate(delivery.getDepartureDate())
                .arrivalDate(delivery.getArrivalDate())
                .sleepSector(delivery.getSleepSector())
                .routeInfo(route.getRouteInfo())
                .build();
    }

    public ReportResponseDto getDeliveryReport(Vehicle vehicle) {

        Map<String, List<LocalDate>> dateInfo = commonDateUtil.getWeekDates();
        List<LocalDate> thisWeek = dateInfo.get("thisWeek");
        List<LocalDate> lastWeek = dateInfo.get("lastWeek");

        List<LocalDate> thisWeekDates = getDatesBetween(thisWeek.get(0), thisWeek.get(1));
        List<LocalDate> lastWeekDates = getDatesBetween(lastWeek.get(0), lastWeek.get(1));

        Member driver = vehicle.getDriver();

        List<Delivery> lastWeekDeliveries = deliveryRepository.findAllByVehicleAndDepartureDateBetween(
                vehicle, lastWeek.get(0).atStartOfDay(), lastWeek.get(1).atStartOfDay());
        List<Delivery> thisWeekDeliveries = deliveryRepository.findAllByVehicleAndDepartureDateBetween(
                vehicle, thisWeek.get(0).atStartOfDay(), thisWeek.get(1).atStartOfDay());

        List<Integer> lastWeekDistance = getDailyDistance(lastWeekDeliveries, lastWeekDates);
        List<Integer> lastWeekDriveTime = getDailyDriveTime(lastWeekDeliveries, lastWeekDates);
        List<Integer> lastWeekSleepIndex = getAverageSleepIndex(lastWeekDeliveries, lastWeekDates);

        List<Integer> thisWeekDistance = getDailyDistance(thisWeekDeliveries, thisWeekDates);
        List<Integer> thisWeekDriveTime = getDailyDriveTime(thisWeekDeliveries, thisWeekDates);
        List<Integer> thisWeekSleepIndex = getAverageSleepIndex(thisWeekDeliveries, thisWeekDates);

        return builder()
                .driverInfo(DriverInfo.builder()
                        .driverName(driver.getName())
                        .phoneNumber(driver.getPhoneNumber())
                        .region(driver.getRegion())
                        .status(driver.getStatus())
                        .vehicleNumber(vehicle.getVehicleNumber())
                        .build())
                .distance(WeekData.builder()
                        .lastWeek(lastWeekDistance)
                        .thisWeek(thisWeekDistance)
                        .build())
                .driveTime(WeekData.builder()
                        .lastWeek(lastWeekDriveTime)
                        .thisWeek(thisWeekDriveTime)
                        .build())
                .avgSleepIndex(WeekData.builder()
                        .lastWeek(lastWeekSleepIndex)
                        .thisWeek(thisWeekSleepIndex)
                        .build())
                // TODO: EEG 데이터 추가
                .eegData(null)
                .build();
    }

    private List<LocalDate> getDatesBetween(LocalDate startDate, LocalDate endDate) {

        List<LocalDate> dates = new ArrayList<>();
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            dates.add(currentDate);
            currentDate = currentDate.plusDays(1);
        }

        log.info("Calculated dates: {}", dates);
        return dates;
    }

    private List<Integer> getAverageSleepIndex(List<Delivery> deliveries, List<LocalDate> weekDates) {

        Map<LocalDate, List<Integer>> sleepIndicesPerDay = new LinkedHashMap<>();

        for (LocalDate date : weekDates) {
            sleepIndicesPerDay.put(date, new ArrayList<>());
        }

        for (Delivery delivery : deliveries) {
            LocalDate date = delivery.getDepartureDate().toLocalDate();
            if (sleepIndicesPerDay.containsKey(date)) {
                sleepIndicesPerDay.get(date).add(delivery.getAveSleepIndex());
            }
        }

        List<Integer> averageSleepIndices = new ArrayList<>();
        for (List<Integer> indices : sleepIndicesPerDay.values()) {
            int average = indices.isEmpty() ? 0 :
                    (int) indices.stream().mapToInt(Integer::intValue).average().orElse(0);
            averageSleepIndices.add(average);
        }

        return averageSleepIndices;
    }

    private List<Integer> getDailyDistance(List<Delivery> deliveries, List<LocalDate> weekDates) {

        Map<LocalDate, Integer> distancePerDay = new HashMap<>();

        for (LocalDate date : weekDates) {
            distancePerDay.put(date, 0);
        }

        for (Delivery delivery : deliveries) {
            LocalDate date = delivery.getDepartureDate().toLocalDate();
            if (distancePerDay.containsKey(date)) {
                distancePerDay.compute(date, (k, currentDistance) ->
                        currentDistance + delivery.getCargo().getDistance());
            }
        }

        return buildResult(weekDates, distancePerDay);
    }

    private List<Integer> getDailyDriveTime(List<Delivery> deliveries, List<LocalDate> weekDates) {

        Map<LocalDate, Integer> driveTimePerDay = new HashMap<>();

        for (LocalDate date : weekDates) {
            driveTimePerDay.put(date, 0);
        }

        for (Delivery delivery : deliveries) {

            LocalDateTime departureDate = delivery.getDepartureDate();
            LocalDateTime arrivalDate = delivery.getArrivalDate();
            LocalDate date = departureDate.toLocalDate();

            if (arrivalDate != null && driveTimePerDay.containsKey(date)) {
                int currentDriveTime = driveTimePerDay.get(date);
                int duration = (int) Duration.between(arrivalDate, departureDate).toMinutes();
                driveTimePerDay.put(date, currentDriveTime + duration);
            }
        }

        return buildResult(weekDates, driveTimePerDay);
    }

    private List<Integer> buildResult(List<LocalDate> weekDates, Map<LocalDate, Integer> map) {

        List<Integer> result = new ArrayList<>();
        for (LocalDate date : weekDates) {
            result.add(map.get(date));
        }
        return result;
    }
}
