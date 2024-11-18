#include "arduinoFFT.h"

const int eegPin = A0;                 // EEG 센서 핀
const uint16_t samples = 128;          // FFT 샘플 수 (2의 제곱수 사용)
const double samplingFrequency = 250;  // 샘플링 주파수 (Hz)

double vReal[samples];
double vImag[samples];

ArduinoFFT<double> FFT = ArduinoFFT<double>(vReal, vImag, samples, samplingFrequency);

void setup() {
  Serial.begin(115200);
  while (!Serial);
}

void loop() {
  /* EEG 데이터 수집 */
  for (uint16_t i = 0; i < samples; i++) {
    vReal[i] = analogRead(eegPin); // EEG 센서 값 수집
    vImag[i] = 0.0;                // 허수 부분 초기화
    delayMicroseconds(1000000 / samplingFrequency); // 샘플링 속도 제어
  }

  FFT.windowing(FFTWindow::Hamming, FFTDirection::Forward); // 데이터 가중치 적용
  FFT.compute(FFTDirection::Forward); // FFT 계산
  FFT.complexToMagnitude(); // 각 주파수 성분의 크기 계산

  /* 대역별 강도 계산 */
  double deltaPower = 0, thetaPower = 0;
  double lowAlphaPower = 0, highAlphaPower = 0;
  double lowBetaPower = 0, highBetaPower = 0;
  double lowGammaPower = 0, highGammaPower = 0;

  for (uint16_t i = 0; i < (samples / 2); i++) {
    double frequency = (i * samplingFrequency) / samples;
    double magnitude = vReal[i];

    // 60Hz 대역의 노이즈 제거 (58Hz ~ 62Hz)
    if (frequency >= 58 && frequency <= 62) {
        vReal[i] = 0; // 60Hz 근처의 값을 0으로 설정하여 노이즈 영향 감소
        continue;
    }

    // 주파수 대역별로 강도 계산
    if (frequency >= 0.5 && frequency < 4) {
      deltaPower += magnitude;         // Delta (0.5–4Hz)
    } else if (frequency >= 4 && frequency < 8) {
      thetaPower += magnitude;         // Theta (4–8Hz)
    } else if (frequency >= 8 && frequency < 10) {
      lowAlphaPower += magnitude;      // Low Alpha (8–10Hz)
    } else if (frequency >= 10 && frequency < 12) {
      highAlphaPower += magnitude;     // High Alpha (10–12Hz)
    } else if (frequency >= 12 && frequency < 20) {
      lowBetaPower += magnitude;       // Low Beta (12–20Hz)
    } else if (frequency >= 20 && frequency < 30) {
      highBetaPower += magnitude;      // High Beta (20–30Hz)
    } else if (frequency >= 30 && frequency < 50) {
      lowGammaPower += magnitude;      // Low Gamma (30–50Hz)
    } else if (frequency >= 50) {
      highGammaPower += magnitude;     // High Gamma (50Hz 이상)
    }
  }

  /* 실시간 데이터 전송 */
  Serial.print(deltaPower); Serial.print(",");
  Serial.print(thetaPower); Serial.print(",");
  Serial.print(lowAlphaPower); Serial.print(",");
  Serial.print(highAlphaPower); Serial.print(",");
  Serial.print(lowBetaPower); Serial.print(",");
  Serial.print(highBetaPower); Serial.print(",");
  Serial.print(lowGammaPower); Serial.print(",");
  Serial.println(highGammaPower); // 마지막 값은 줄바꿈 포함

  // 1초 대기 후 다시 측정
  delay(250);
}
