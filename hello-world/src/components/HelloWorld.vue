<template>
  <div class="hello">
    <div class="mt-15">
      <button  @click="connectWallet" id="walletBtn">
        Sign in with Wallet
      </button>
    </div>
  </div>
</template>

<script>
import { updateInfoOnCeramic } from '@/utils/ceramic'
export default {
  methods: {
    async connectWallet() {
      await updateInfoOnCeramic()
    }
  }
}
</script>
