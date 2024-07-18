<template>
    <div id="mobile">
		<div class="px-3 my-3">
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-body text-center border-0">
                            <p>
                                <img src="/whiteLogo.png" alt="Logo" width="64" height="64" class="d-inline-block align-text-top">
                                <h5 class="text-light">NG Space Company</h5>
                            </p>
							<p class="text-danger">{{ $t('mobileText1') }}</p>
							<p class="h6 text-light">{{ $t('mobileText2') }}</p>
							<div class="text-center">
								<a href="https://play.google.com/store/apps/details?id=com.freddecgames.ngsc" target="_blank">
									<img src="/playstore.png" alt="Get it on Google Play" width="256">
								</a>
							</div>
							<div class="text-center">
								<span>{{ $t('mobileText3') }}</span>
								<a href="https://discord.gg/3UkgeeT9CV" target="_blank">Discord</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<style>
    #mobile {
        width: 100%; height: 100%; padding: 1rem 0;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
    }    
</style>
