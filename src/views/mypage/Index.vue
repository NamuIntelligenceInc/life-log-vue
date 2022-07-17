<template>
  <div class="mypage-index-page">
    <nav class="navbar navbar-light bg-primary">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3">
                마이페이지
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="card mb-3">
            <div class="card-header bg-white">
              <i class="mdi mdi-account-outline"></i>
              프로필
            </div>
            <div class="card-body">
              <div class="row mb-2">
                <label class="col-3 col-form-label font-weight-bolder">
                  이름
                </label>
                <div class="col-9 col-form-label">
                  서강민
                </div>
              </div>
              <div class="row mb-2">
                <label class="col-3 col-form-label font-weight-bolder">
                  생년월일
                </label>
                <div class="col-9 col-form-label">
                  1986.3.19 <small>(만 35세)</small>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-header bg-white">
              <i class="mdi mdi-account-check-outline"></i>
              기본정보
            </div>
            <div class="card-body">
              <div class="row mb-2">
                <label class="col-3 col-form-label font-weight-bolder">
                  평균 흡연량
                </label>
                <div class="col-9">
                  <select class="form-control underline">

                  </select>
                </div>
              </div>
              <div class="row mb-2">
                <label class="col-3 col-form-label font-weight-bolder">
                  생년월일
                </label>
                <div class="col-9 col-form-label">
                  1986.3.19 <small>(만 35세)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MypageIndexPage',
  data() {
    return {

    }
  }
}
</script>