package ssafy.modo.jamkkaebi.common.util;

import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CommonDateUtil {

    public Map<String, List<LocalDate>> getWeekDates() {

        Map<String, List<LocalDate>> result = new HashMap<>();
        List<LocalDate> thisWeek = new ArrayList<>();
        List<LocalDate> lastWeek = new ArrayList<>();

        LocalDate today = LocalDate.now();

        LocalDate startOfThisWeek = getStartOfWeek(today);
        LocalDate endOfThisWeek = startOfThisWeek.plusDays(6);

        LocalDate startOfLastWeek = startOfThisWeek.minusWeeks(1);
        LocalDate endOfLastWeek = startOfLastWeek.plusDays(6);

        thisWeek.add(startOfThisWeek);
        thisWeek.add(endOfThisWeek);

        lastWeek.add(startOfLastWeek);
        lastWeek.add(endOfLastWeek);

        result.put("thisWeek", thisWeek);
        result.put("lastWeek", lastWeek);

        return result;
    }

    private static LocalDate getStartOfWeek(LocalDate date) {
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        int daysToSubtract = (dayOfWeek.getValue() % 7);
        return date.minusDays(daysToSubtract);
    }
}
