import json
import csv

# JSON 파일 이름 설정
input_file = 'input.json'  # 실제 JSON 파일 이름으로 변경하세요
output_file = 'output.csv'  # 저장할 CSV 파일 이름

# JSON 파일 읽기
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 좌표 데이터 가져오기
coordinates = data.get('coordinates', [])

# 좌표 변환 (경도, 위도) -> (위도, 경도)
converted_coordinates = [[lat, lon] for lon, lat in coordinates]

# 변환된 좌표를 CSV 파일로 저장
with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    # 헤더 추가 (선택 사항)
    writer.writerow(['Latitude', 'Longitude'])
    # 데이터 작성
    writer.writerows(converted_coordinates)

print("좌표 변환 및 CSV 파일 저장이 완료되었습니다.")
