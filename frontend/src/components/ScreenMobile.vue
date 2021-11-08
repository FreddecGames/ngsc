<template>
    <div id="mobile">
        <img :src="require(`../assets/whiteLogo.png`).default" alt="Logo" width="64" height="64" class="d-inline-block align-text-top">
        <h5 class="text-light">NG Space Company</h5>
		<div class="px-3 my-3">
			<div class="row">
				<div class="col-12">
					<div class="card">
						<div class="card-body text-center">
							<p class="text-danger">{{ $t('mobileText1') }}</p>
							<p class="h6 text-light">{{ $t('mobileText2') }}</p>
							<div class="text-center">
								<a href="https://play.google.com/store/apps/details?id=com.freddecgames.ngsc" target="_blank">
									<img :src="require(`../assets/playstore.png`).default" alt="Get it on Google Play" width="256">
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
        width: 100%; height: 100%;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
    }    
</style>

<script>
export default {
}
</script>