# SSAFY 11기 자율 프로젝트: 잠깨비 Jamkkaebi

<table align="center">
<tr>
<td align="center">
<img alt='logo' src='./assets/main_img.PNG' width=100% align='center'>
</a>
</td>
</tr>
</table>
 

## Index
#### &emsp; [➤ 프로젝트 소개](#-프로젝트-소개)<br>
#### &emsp; [➤ 프로젝트 설계](#-프로젝트-설계)<br>
#### &emsp; [➤ 기능 소개](#-기능-소개)<br>
#### &emsp; [➤ 산출물](#-산출물)<br>
<br>


# 🚔 프로젝트 소개

## 뇌파와 근전도 센서를 활용한 졸음 감지 및 알림 시스템
1. 뇌파와 근전도 센서를 통한 졸음 감지
2. 졸음 상태일 때 졸음을 깨울 수 있는 알림(가족 목소리 알림, LED/에어컨 켜기, 진동)
3. 차량용 대시보드를 통해 내비게이션 등의 임포테인먼트 기능과 차량 내부 조작 기능
4. 관리자 페이지에서 운전자 별 데이터 확인 및 운전 보고서 제작
5. 차량 전장을 모사하기 위해 ECU 단위의 시스템 구현 및 CAN 통신 활용

<br>

## 프로젝트 기간

**2024.10.14 ~ 2024.11.19 (6주)**
<br>

## 팀 소개
<table>
  <thead>
    <tr>
      <th style="text-align: center;">조정훈</th>
      <th style="text-align: center;">박건국</th>
      <th style="text-align: center;">정우영</th>
      <th style="text-align: center;">송준혁</th>
      <th style="text-align: center;">이예지</th>
      <th style="text-align: center;">이정준</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">Embedded</td>
      <td style="text-align: center;">Embedded</td>
      <td style="text-align: center;">Embedded/AI</td>
      <td style="text-align: center;">Backend/Infra</td>
      <td style="text-align: center;">Frontend</td>
      <td style="text-align: center;">Frontend</td>
    </tr>
  </tbody>
</table>
<br>

## 기획 배경

<img alt='func3.2' src='./assets/car_crash.PNG'/>

- 졸음 운전은 일 평균 5.9건이 발생, 이로 인한 사망자는 사고 100건 당 2.9명으로 음주운전 사고(1.5명)의 2배에 이르는 수치
- 10만 대당 졸음운전 사고는 특수차(13.6건), 승합차(11.2건), 화물차(10.6건), 승용차(7.8건) 순으로 업무용 차량이 졸음 운전의 82%를 차지
- 이에 업무용 차량을 타겟으로, 졸음을 모니터링 하고 깨우는 시스템을 구성해 사고를 예방 할 수 있는 서비스 기획
  - 이미지 처리의 인식률과 처리 속도 문제를 보완하기 위해 뇌파(EEG)와 근전도(EMG)를 활용하여 사용자 상태 확인
  - UART와 CAN 프로토콜을 이용, 차량 전장 환경을 구성하여 통신 환경 구축

## 구현도
<img alt='func3.2' src='./assets/구현도.png'/>
  
<br>

# 🚔 프로젝트 설계
## 개발 환경

### Infra
<img alt="Amazon EC2" src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"/>
<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=RabbitMQ&logoColor=white">

### Backend
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">

### Database
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

### Frontend
<img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img alt="vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">
<img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt="js" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
<img alt="CSS" src="https://img.shields.io/badge/CSS-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logoColor=white&logo=tailwindcss">

### Embedded
<img alt="python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"/> 
<img alt="openvc" src="https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=C&logoColor=white">

### MCU
<img alt="raspberrypi" src="https://img.shields.io/badge/raspberrypi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=white"/> 
<img alt="stmicroelectronics" src="https://img.shields.io/badge/stmicroelectronics-03234B?style=for-the-badge&logo=stmicroelectronics&logoColor=white">
<img alt="arduino" src="https://img.shields.io/badge/arduino-00878F?style=for-the-badge&logo=arduino&logoColor=white">

### 협업 툴
<img alt='jira' src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white">
<a href="https://www.notion.so/1-C104-c02fce6e587f4bb5acf3c834544dd04f">
<img alt='jira' src="https://img.shields.io/badge/Notion-black?style=for-the-badge&logo=Notion&logoColor=white">
</a>
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">

<br><br>

## ER Diagram
![ERD](./assets/ERD.png)

## 아키텍처
### Web
![Web](./assets/자율_아키텍처.png)

### Embedded
![Embedded](./assets/자율_회로.png)
<br><br>

## 🚔 기능 소개
### 1. 뇌파와 근전도를 활용한 상태 모니터링
<p style="display: flex; justify-content: space-between;">
  <img alt="func1.1" src="./assets/이정준_뇌파_얼굴.PNG" width="45%">
  <img alt="func1.1" src="./assets/이정준_뇌파_데이터.PNG" width="45%">
</p>

<p style="display: flex; justify-content: space-between;">
  <img alt="func1.1" src="./assets/조정훈_뇌파_얼굴.PNG" width="45%">
  <img alt="func1.1" src="./assets/조정훈_뇌파_데이터.PNG" width="45%">
</p>

- EEG Click(INA114) 와 아두이노를 사용해 데이터 측정

<br>

### 2. 차량제어
#### 차량제어 로직
<img alt='func2' src='./assets/제어로직.PNG'>

1. 서버에서 MQTT 프로토콜로 제어 신호 전송
2. Raspberry Pi에서 수신 및 파싱 후 UART 전송
3. STM429에서 데이터 수신 후 CAN으로 명령 입력
4. 각각의 ECU 동작

#### 2.1 자동제어 동작
<img alt='func2.1' src='./assets/자동제어.gif'>

#### 2.2 진동모터
<img alt='func2.1' src='./assets/진동.jpg'>

#### 2.3 LED 동작
<img alt='func2.2' src='./assets/LED.gif'>

#### 2.4 DC모터 동작
<img alt='func2.3' src='./assets/dc.gif'>

#### 2.5 리니어 동작
<img alt='func2.4' src='./assets/리니어.gif'>


### 3. 운전자용 대시보드
#### 3.1 대시보드 홈
<img alt='func3.1' src='./assets/대쉬보드_홈.gif'>

1. 실시간 집중 지수/ 졸음지수 확인
2. 네비게이션 / 근처 휴게시설 조회
3. 날씨 정보

#### 3.2 대시보드 내비게이션
<img alt='func3.2' src='./assets/대쉬보드_내비게이션.gif'>

1. 목적지 경로 추적
2. 근처 휴게 시설 정보 제공
3. 가고자 하는 휴게시설 클릭 시 해당 휴게소 경유지 추가

#### 3.3 대시보드 컨트롤
<img alt="func3.4" src="./assets/대쉬보드_컨트롤.gif">

<br>
<p style="display: flex; justify-content: space-between;">
  <img alt="func3.3" src="./assets/대쉬보드_LED_컨트롤1.png" width="30%">
  <img alt="func3.3" src="./assets/대쉬보드_LED_컨트롤2.png" width="30%">
  <img alt="func3.3" src="./assets/대쉬보드_LED_컨트롤3.png" width="30%">
</p>


#### 3.4 운전자용 보고서
<p style="display: flex; justify-content: space-between;">
  <img alt="func3.4" src="./assets/대쉬보드_운행보고서.gif">
</p>

1. 누적 주행 거리 및 일일 근무 시간, 평균 집중/졸음 지수 조회
2. 운전자의 실시간 집중 / 졸음 지수의 변화 추이 조회
3. 과거 운전자의 운행 기록 조회

#### 3.5 운전자용 상세보고서
<p style="display: flex; justify-content: space-between;">
  <img alt="func3.4" src="./assets/대쉬보드_상세보고서1.png" width="45%">
  <img alt="func3.4" src="./assets/대쉬보드_상세보고서2.png" width="45%">
</p>

<br>

### 4. 관리자 페이지

#### 4.1 실시간 운전자 위치 확인
<img alt='func4.1' src='./assets/관리자_운전자위치.png'>

#### 4.2 운전자 정보 & 졸음 발생 알림
<p style="display: flex; justify-content: space-between;">
  <img alt="func1.1" src="./assets/관리자_운전자정보.png" width="45%">
  <img alt="func1.1" src="./assets/관리자_졸음알림.png" width="45%">
</p>

#### 4.3 운전자 리스트
<img alt='func4.3' src='./assets/관리자_운전자리스트.png'>

#### 4.4 운전자 히스토리
<img alt='func4.4' src='./assets/관리자_히스토리.png'>

#### 4.5 운전자 운전보고서
<img alt='func4.5' src='./assets/관리자_운전보고서.png'>
