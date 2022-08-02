import Constants from '../plugins/constants'
export default [
  {
    title: '건강위험평가(HRA)설문참여 안내',
    description: `
    <p class="mb-1">건강위험평가(HRA)설문을 꼭! 진행해 주세요.</p>
    <p class="mb-3">설문을 진행하지 않으시면 참여대상에서 제외됩니다.</p>
    <p class="mb-3 text-success">이미 설문에 참여하셨다면 진행하지 않으셔도 됩니다.</p>
    <a target="_blank" href="${Constants.HRALink}" class="btn btn-block btn-link text-left">
      <i class="mdi mdi-hand-pointing-right"></i>
      지금 설문참여하기
    </a>
    `,
    created_dt: '2022-07-29'
  },
  {
    title: '앱을 더 편리하게 사용하는 방법',
    description: `
    <p class="mb-1">홈화면 추가를 통해 바탕화면에 앱을 설치하시면 더 편리하게 이용하실 수 있습니다.</p>    
    <a href="/help/install?device=android" class="btn btn-block btn-link text-left">
      <i class="mdi mdi-hand-pointing-right"></i>
      안드로이드 홈화면 추가하기
    </a>
    <a href="/help/install?device=ios" class="btn btn-block btn-link text-left">
      <i class="mdi mdi-hand-pointing-right"></i>
      아이폰 홈화면 추가하기      
    </a>
    `,
    created_dt: '2022-07-29'
  }
]