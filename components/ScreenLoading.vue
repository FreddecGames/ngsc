<template>
    <div id="loading">
		<div class="px-3 my-3">
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-body text-center border-0">
                            <p>
                                <img src="/whiteLogo.png" alt="Logo" width="64" height="64" class="d-inline-block align-text-top">
                                <h5 class="text-light">NG Space Company</h5>
                            </p>
                            <span id="loading-flicker" class="text-steelblue mt-3">{{ $t('screen-loading-text') }}</span>
                        </div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<style>
    #loading {
        width: 100%; height: 100%;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    
    @keyframes flickerAnimation {
      0%   { opacity: .9; }
      50%  { opacity: .1; }
      100% { opacity: .9; }
    }
    @-o-keyframes flickerAnimation{
      0%   { opacity: .9; }
      50%  { opacity: .1; }
      100% { opacity: .9; }
    }
    @-moz-keyframes flickerAnimation{
      0%   { opacity: .9; }
      50%  { opacity: .1; }
      100% { opacity: .9; }
    }
    @-webkit-keyframes flickerAnimation{
      0%   { opacity: .9; }
      50%  { opacity: .1; }
      100% { opacity: .9; }
    }
    
    #loading-flicker {
       -webkit-animation: flickerAnimation 2s infinite;
       -moz-animation: flickerAnimation 2s infinite;
       -o-animation: flickerAnimation 2s infinite;
        animation: flickerAnimation 2s infinite;
    }
</style>
