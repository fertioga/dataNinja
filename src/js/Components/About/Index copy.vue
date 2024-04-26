<template>
    <div>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            About
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">About</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <p>author: <a href="mailto:fertioga@gmail.com">fertioga@gmail.com</a></p>
                    <p>If you love the plugin: </p>
                    <p>
                        <a href="https://www.buymeacoffee.com/fertioga" target="_blank">
                            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 30px !important;width: 110px !important;" >
                        </a>
                    </p>
                    <p>
                        PIX: 
                        <img src="images/qr-code.png" alt="PIX">
                    </p>
                    <p>© {{ year }} Data Ninja. All rights reserved.</p>
                    <p>version: {{ version }}</p>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'About',
    data() {
        return {
            year: '',
            version: '',
        };
    },
    mounted() {
        const now = new Date(); 
        this.year = now.getFullYear();

        this.version = chrome.runtime.getManifest().version;
    },
};
</script>