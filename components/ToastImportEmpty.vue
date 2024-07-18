<template>
    <div id="toastImportEmpty" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="col toast-body small">{{ $t('toast_importEmpty') }}</div>
            <button type="button" class="btn-close p-2" data-bs-dismiss="toast" :aria-label="$t('toast_close')">
                <span class="text-black"><font-awesome-icon icon="fas fa-times" /></span>
            </button>
        </div>
    </div>
</template>