package com.methil.data

import com.methil.data.BuildConfig

object AikoConfig {
    const val BASE_URL = "https://ethancarollo--aiko-backend-vllm-serve.modal.run/v1"
    const val ASSETS_BASE_URL = "http://10.0.2.2:3845"
    const val DEFAULT_MODEL = "aiko"
    val API_KEY = BuildConfig.AIKO_API_KEY
}