import csv
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'total_data.csv')

try:
    with open(file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # 첫 번째 행 건너뛰기
        for row in reader:
            print(row)
except FileNotFoundError:
    print(f"파일을 찾을 수 없습니다: {file_path}")
except Exception as e:
    print(f"파일을 읽는 중 에러 발생: {e}")
