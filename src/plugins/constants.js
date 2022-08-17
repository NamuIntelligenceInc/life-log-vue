const Coordinators = {
  '조문희': '01095062711',
  '국현지': '01096382711',
  '장차희': '01095622711',
  '이진옥': '01098172711',
}

export default {  
  SelectedFoodsLimit: 5,
  HRALink: 'https://namuintelligence.surveysparrow.com/s/HRA---3/tt-1d4d6eda94',
  KakaoChatLink: 'http://pf.kakao.com/_xilxoDb/chat',
  Options: {
    SmokingAmt: {
      '0':'피우지 않음',      
      '10':'반갑 (10 개비)',
      '20':'한갑 (20 개비)',
      '30':'한갑 반 (30 개비)',
      '40':'두갑 (40 개비)',
      '50':'두갑 반(50 개비)',
      '60':'세갑(60 개비)',
    },
    WaterAmt: {      
      '250':'반병',
      '500':'1병',
      '750':'1병 반',
      '1000':'2병',
      '1250':'2병 반',
      '1500':'3병',
      '1750':'3병 반',
      '2000': '4병'
    },
    DrinkAmt: {
      '0.5': '반병',
      '1': '1병',
      '1.5': '1병 반',
      '2': '2병',
      '2.5': '2병 반',
      '3': '3병',
      '3.5': '3병 반',
      '4': '4병',
      '4.5': '4병 반',
      '5': '5병 이상',
    },
    DrinkTypes: ['소주','맥주','양주','막걸리'],    
    ExerciseTypes : [
      '걷기, 달리기',
      '수영',
      '웨이트(근력운동)',
      '요가,필라테스',
      '사이클(자전거)',
      '골프 등 정적 스포츠',
      '배드민턴 등 동적 스포츠',
      '기타'
    ],
    ExerciseLevels: ['저강도','중강도','고강도'],
    ExerciseMinutes: {
      '30':'30분',
      '60':'1시간',
      '90':'1시간 반',
      '120':'2시간',
      '150':'2시간 반',
      '180':'3시간',
    },
    Gender: {
      '남자': '0',
      '여자': '1'
    },
    YN: {
      Yes: {
        text: '예',
        val: '1'
      },
      No: {
        text: '아니오',
        val: '0'
      }
    }
  },
  Selection: {
    YN: {
      Yes: {
        text: '예',
        val: '1'
      },
      No: {
        text: '아니오',
        val: '0'
      }
    }
  },
  EatTypes: {
    morning: '아침',
    lunch: '점심',
    dinner: '저녁',
    snack: '간식'
  },
  Managers: {
    '전남대학교병원-1': Coordinators['조문희'],
    '전남대학교병원-0': Coordinators['국현지'],
    '부산대학교병원-1': Coordinators['장차희'],    
    '전북대학교병원-1': Coordinators['조문희'],
    '전북대학교병원-0': Coordinators['이진옥'],
    '화순전남대병원-1': Coordinators['장차희'],
    '화순전남대병원-0': Coordinators['조문희'],
    '씨젠의료재단-0': Coordinators['이진옥'],    
    '전남대학교-0': Coordinators['이진옥'],
    'UNIST-0': Coordinators['조문희'],    
    '스마트인재개발원-0': Coordinators['이진옥'],
    '광주테크노파크-0': Coordinators['조문희'],    
    '나무인텔리전스-0': Coordinators['이진옥'],
    '나무기술계열사-0': Coordinators['조문희'],
    '이루온아이앤에스-0': Coordinators['장차희'],    
    'I-PLEX-0': Coordinators['장차희']
  },
  ErrMessages: {
    '401': '접근 권한이 없이 페이지 입니다',
  }  
}

