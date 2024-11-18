/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2024 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */

/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
CAN_HandleTypeDef hcan;
TIM_HandleTypeDef htim1;
DMA_HandleTypeDef hdma_tim1_ch1;

/* USER CODE BEGIN PV */
CAN_RxHeaderTypeDef RxHeader;

uint8_t RxData[8];

uint32_t TxMailbox;

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_DMA_Init(void);
static void MX_CAN_Init(void);
static void MX_TIM1_Init(void);
static void MX_NVIC_Init(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
int s_red = 255;
int s_gre = 0;
int s_blu = 0;
int s_bri = 100;
int auto_flag = 0;
#define LED_MAX 5 // LED cnt
volatile uint8_t can_message_received = 0;
volatile int datasentflag = 0;

uint8_t LED_Data[LED_MAX][3];  // Red, Green, Blue
uint16_t pwmData[(24 * LED_MAX) + 50];


void HAL_TIM_PWM_PulseFinishedCallback(TIM_HandleTypeDef *htim){
    HAL_TIM_PWM_Stop_DMA(&htim1, TIM_CHANNEL_1);
    datasentflag = 1;
}

// 색상 설정 함수
void Set_Color(int Red, int Green, int Blue) {
	float brightnessFactor;
	if(auto_flag == 0){
		s_red = Red, s_gre = Green, s_blu = Blue;
		brightnessFactor = s_bri / 100.0;
	}
	else{
		brightnessFactor = 100 / 100.0;
	}


    for (int i = 0; i < LED_MAX; i++) {
        LED_Data[i][0] = (uint8_t)(Green * brightnessFactor);         // Green
        LED_Data[i][1] = (uint8_t)(Red * brightnessFactor);           // Red
        LED_Data[i][2] = (uint8_t)(Blue * brightnessFactor);          // Blue
    }
}

// 밝기 조절 함수
void Set_Brightness(int brightness){
    if (brightness > 100)
    	brightness = 100;  // 밝기 최대값 제한
    if(RxData[0] != 0)
    	s_bri = brightness;
    float brightnessFactor = brightness / 100.0;  // 0.0에서 1.0 사이 비율로 변환

    for (int i = 0; i < LED_MAX; i++){
        LED_Data[i][0] = (uint8_t)(s_gre * brightnessFactor);  // Green 밝기 조정
        LED_Data[i][1] = (uint8_t)(s_red * brightnessFactor);  // Red 밝기 조정
        LED_Data[i][2] = (uint8_t)(s_blu * brightnessFactor);  // Blue 밝기 조정
    }
}

void WS2812_Send(){

    uint32_t indx = 0;
    uint32_t color;

    for (int i = 0; i < LED_MAX; i++){
        color = ((LED_Data[i][0] << 16) | (LED_Data[i][1] << 8) | (LED_Data[i][2]));

        for (int j = 23; j >= 0; j--){
            if (color & (1 << j)){
                pwmData[indx] = 60;  // 2/3 of 90
            }
            else{
                pwmData[indx] = 30;  // 1/3 of 90
            }
            indx++;
        }
    }

    for (int i = 0; i < 50; i++){
        pwmData[indx] = 0;
        indx++;
    }

    datasentflag = 0;
    HAL_TIM_PWM_Start_DMA(&htim1, TIM_CHANNEL_1, (uint32_t *)pwmData, indx);
    uint32_t timeout = HAL_GetTick();
    while (!datasentflag) {
        if ((HAL_GetTick() - timeout) > 100) {  // 100ms 타임아웃
            HAL_TIM_PWM_Stop_DMA(&htim1, TIM_CHANNEL_1); // DMA 전송 중지
            break;
        }
    }
    datasentflag = 0;
}



void HAL_CAN_RxFifo1MsgPendingCallback(CAN_HandleTypeDef *hcan){

    HAL_CAN_GetRxMessage(hcan, CAN_RX_FIFO1, &RxHeader, RxData);

    if (RxHeader.StdId == 0x102) {

    	HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);
    	can_message_received = 1;

        if (RxData[0] == 0) { // off
            //HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, 1);
        	Set_Brightness(0);
        }
        else if (RxData[0] == 1) { // on
            //HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, 0);
            Set_Color(s_red, s_gre, s_blu);
        }
        else if (RxData[0] == 2){ // brightness
        	Set_Brightness(RxData[4]);

        }
        else if (RxData[0] == 3){ //change color
        	Set_Color(RxData[1], RxData[2], RxData[3]);
        }
        auto_flag = 0;
    }
    else if(RxHeader.StdId == 0x200){
    	if(RxData[0] == 1){
        	auto_flag = 1;
    	}
    	else if(RxData[0] == 0){
    		Set_Brightness(0);
    		auto_flag = 0;
    		can_message_received = 1;
    	}
    }

    HAL_CAN_ActivateNotification(&hcan, CAN_IT_RX_FIFO1_MSG_PENDING);
}

/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_DMA_Init();
  MX_CAN_Init();
  MX_TIM1_Init();

  /* Initialize interrupts */
  MX_NVIC_Init();
  /* USER CODE BEGIN 2 */
  Set_Color(s_red, s_gre, s_blu);
  Set_Brightness(100);
  //WS2812_Send();

  HAL_CAN_Start(&hcan);

  //Activate the Notification
  HAL_CAN_ActivateNotification(&hcan, CAN_IT_RX_FIFO1_MSG_PENDING);


  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
	  if(can_message_received && auto_flag != 1){
	        can_message_received = 0;
	        WS2812_Send();
	  }
	  if(auto_flag == 1){
		  Set_Color(255, 0, 0);
		  WS2812_Send();
		  HAL_Delay(200);
		  Set_Color(0, 0, 255);
		  WS2812_Send();
		  HAL_Delay(200);
		  if(auto_flag == 0)
			  Set_Brightness(0);
	  }
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
  RCC_OscInitStruct.HSEState = RCC_HSE_ON;
  RCC_OscInitStruct.HSEPredivValue = RCC_HSE_PREDIV_DIV1;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
  RCC_OscInitStruct.PLL.PLLMUL = RCC_PLL_MUL9;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV2;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2) != HAL_OK)
  {
    Error_Handler();
  }
}

/**
  * @brief NVIC Configuration.
  * @retval None
  */
static void MX_NVIC_Init(void)
{
  /* CAN1_RX1_IRQn interrupt configuration */
  HAL_NVIC_SetPriority(CAN1_RX1_IRQn, 0, 0);
  HAL_NVIC_EnableIRQ(CAN1_RX1_IRQn);
}

/**
  * @brief CAN Initialization Function
  * @param None
  * @retval None
  */
static void MX_CAN_Init(void)
{

  /* USER CODE BEGIN CAN_Init 0 */

  /* USER CODE END CAN_Init 0 */

  /* USER CODE BEGIN CAN_Init 1 */

  /* USER CODE END CAN_Init 1 */
  hcan.Instance = CAN1;
  hcan.Init.Prescaler = 18;
  hcan.Init.Mode = CAN_MODE_NORMAL;
  hcan.Init.SyncJumpWidth = CAN_SJW_1TQ;
  hcan.Init.TimeSeg1 = CAN_BS1_2TQ;
  hcan.Init.TimeSeg2 = CAN_BS2_1TQ;
  hcan.Init.TimeTriggeredMode = DISABLE;
  hcan.Init.AutoBusOff = DISABLE;
  hcan.Init.AutoWakeUp = DISABLE;
  hcan.Init.AutoRetransmission = DISABLE;
  hcan.Init.ReceiveFifoLocked = DISABLE;
  hcan.Init.TransmitFifoPriority = DISABLE;
  if (HAL_CAN_Init(&hcan) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN CAN_Init 2 */

  CAN_FilterTypeDef canFilter;
  canFilter.FilterActivation = CAN_FILTER_ENABLE;
  canFilter.FilterBank = 10;
  canFilter.FilterFIFOAssignment = CAN_FILTER_FIFO1;
  canFilter.FilterIdHigh = 0x102 << 5;
  canFilter.FilterIdLow = 0;
  canFilter.FilterMaskIdHigh = 0x102 << 5;
  canFilter.FilterMaskIdLow = 0x0000;
  canFilter.FilterMode = CAN_FILTERMODE_IDMASK;
  canFilter.FilterScale = CAN_FILTERSCALE_32BIT;
  canFilter.SlaveStartFilterBank = 0;

  HAL_CAN_ConfigFilter(&hcan, &canFilter);

  CAN_FilterTypeDef canFilter_auto;
  canFilter_auto.FilterActivation = CAN_FILTER_ENABLE;
  canFilter_auto.FilterBank = 9;
  canFilter_auto.FilterFIFOAssignment = CAN_FILTER_FIFO1;
  canFilter_auto.FilterIdHigh = 0x200 << 5;
  canFilter_auto.FilterIdLow = 0;
  canFilter_auto.FilterMaskIdHigh = 0x200 << 5;
  canFilter_auto.FilterMaskIdLow = 0x0000;
  canFilter_auto.FilterMode = CAN_FILTERMODE_IDMASK;
  canFilter_auto.FilterScale = CAN_FILTERSCALE_32BIT;
  canFilter_auto.SlaveStartFilterBank = 0;

  HAL_CAN_ConfigFilter(&hcan, &canFilter_auto);

  /* USER CODE END CAN_Init 2 */

}

/**
  * @brief TIM1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_TIM1_Init(void)
{

  /* USER CODE BEGIN TIM1_Init 0 */

  /* USER CODE END TIM1_Init 0 */

  TIM_MasterConfigTypeDef sMasterConfig = {0};
  TIM_OC_InitTypeDef sConfigOC = {0};
  TIM_BreakDeadTimeConfigTypeDef sBreakDeadTimeConfig = {0};

  /* USER CODE BEGIN TIM1_Init 1 */

  /* USER CODE END TIM1_Init 1 */
  htim1.Instance = TIM1;
  htim1.Init.Prescaler = 0;
  htim1.Init.CounterMode = TIM_COUNTERMODE_UP;
  htim1.Init.Period = 90 - 1;
  htim1.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
  htim1.Init.RepetitionCounter = 0;
  htim1.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_DISABLE;
  if (HAL_TIM_PWM_Init(&htim1) != HAL_OK)
  {
    Error_Handler();
  }
  sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
  sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
  if (HAL_TIMEx_MasterConfigSynchronization(&htim1, &sMasterConfig) != HAL_OK)
  {
    Error_Handler();
  }
  sConfigOC.OCMode = TIM_OCMODE_PWM1;
  sConfigOC.Pulse = 0;
  sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
  sConfigOC.OCNPolarity = TIM_OCNPOLARITY_HIGH;
  sConfigOC.OCFastMode = TIM_OCFAST_DISABLE;
  sConfigOC.OCIdleState = TIM_OCIDLESTATE_RESET;
  sConfigOC.OCNIdleState = TIM_OCNIDLESTATE_RESET;
  if (HAL_TIM_PWM_ConfigChannel(&htim1, &sConfigOC, TIM_CHANNEL_1) != HAL_OK)
  {
    Error_Handler();
  }
  sBreakDeadTimeConfig.OffStateRunMode = TIM_OSSR_DISABLE;
  sBreakDeadTimeConfig.OffStateIDLEMode = TIM_OSSI_DISABLE;
  sBreakDeadTimeConfig.LockLevel = TIM_LOCKLEVEL_OFF;
  sBreakDeadTimeConfig.DeadTime = 0;
  sBreakDeadTimeConfig.BreakState = TIM_BREAK_DISABLE;
  sBreakDeadTimeConfig.BreakPolarity = TIM_BREAKPOLARITY_HIGH;
  sBreakDeadTimeConfig.AutomaticOutput = TIM_AUTOMATICOUTPUT_DISABLE;
  if (HAL_TIMEx_ConfigBreakDeadTime(&htim1, &sBreakDeadTimeConfig) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN TIM1_Init 2 */

  /* USER CODE END TIM1_Init 2 */
  HAL_TIM_MspPostInit(&htim1);

}

/**
  * Enable DMA controller clock
  */
static void MX_DMA_Init(void)
{

  /* DMA controller clock enable */
  __HAL_RCC_DMA1_CLK_ENABLE();

  /* DMA interrupt init */
  /* DMA1_Channel2_IRQn interrupt configuration */
  HAL_NVIC_SetPriority(DMA1_Channel2_IRQn, 0, 0);
  HAL_NVIC_EnableIRQ(DMA1_Channel2_IRQn);

}

/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};
/* USER CODE BEGIN MX_GPIO_Init_1 */
/* USER CODE END MX_GPIO_Init_1 */

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOC_CLK_ENABLE();
  __HAL_RCC_GPIOD_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOC, GPIO_PIN_13, GPIO_PIN_RESET);

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_RESET);

  /*Configure GPIO pin : PC13 */
  GPIO_InitStruct.Pin = GPIO_PIN_13;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

  /*Configure GPIO pin : PA5 */
  GPIO_InitStruct.Pin = GPIO_PIN_5;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

/* USER CODE BEGIN MX_GPIO_Init_2 */
/* USER CODE END MX_GPIO_Init_2 */
}

/* USER CODE BEGIN 4 */

/* USER CODE END 4 */

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
