<script setup lang="ts">
import { useTopNewsQuery } from '@/api/news/news.queries';
import { IonIcon, IonText, IonTitle } from '@ionic/vue';
import { newspaperOutline, timeOutline } from 'ionicons/icons';

const { data: articles, error, isError, isLoading } = useTopNewsQuery();

const openExternalUrl = (url: string) => {
  // '_blank' memastikan tautan dibuka di tab baru (jika di browser)
  // atau In-App Browser (jika sudah jadi aplikasi mobile lewat Capacitor)
  window.open(url, '_blank');
};
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="px-2">
        <ion-title>
          <div class="flex items-center gap-2">
            <ion-icon :icon="newspaperOutline" class="text-2xl text-gray-700"></ion-icon>
            <span class="text-2xl font-bold text-gray-700">MorningNews</span>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Header Section & Filter -->
      <section class="px-4">
        <div class="flex justify-between items-center mt-4">
          <div class="font-semibold text-2xl text-gray-800">Berita Terkini</div>

          <!-- Menggunakan lines="none" agar garis bawah bawaan ion-item hilang -->
          <ion-item lines="none" class="bg-gray-100 rounded-lg">
            <ion-select aria-label="Bahasa" value="en" interface="popover">
              <ion-select-option value="en">Inggris</ion-select-option>
              <ion-select-option value="id">Indonesia</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
      </section>

      <!-- Content Section -->
      <section class="px-4 mt-6 pb-6">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center mt-10">
          <ion-spinner name="crescent"></ion-spinner>
        </div>

        <!-- Error State -->
        <div v-else-if="isError" class="bg-red-100 text-red-600 text-center rounded-xl mt-6 p-4">
          Terjadi kesalahan: {{ error?.message || 'Gagal memuat berita' }}
        </div>

        <!-- Data Tampil Menggunakan Card -->
        <!-- Memakai CSS Grid agar responsif (1 kolom di HP, 2 kolom di Tablet) -->
        <div v-else-if="articles" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ion-card
            v-for="(article, index) in articles"
            :key="index"
            class="m-0 shadow-md rounded-xl overflow-hidden bg-white"
          >
            <!-- Gambar Full Width di atas Card -->
            <img v-if="article.image" :src="article.image" :alt="article.title" class="w-full h-48 object-cover" />

            <ion-card-header class="px-2">
              <ion-card-subtitle class="text-blue-600 font-semibold tracking-wide pt-1">
                <span @click="openExternalUrl(article.source.url)" class="underline cursor-pointer">
                  {{ article.source.name }}
                </span>
              </ion-card-subtitle>
              <ion-card-title class="font-bold text-gray-900 text-lg leading-tight font-serif mt-2 px-2">
                {{ article.title }}
              </ion-card-title>
            </ion-card-header>

            <!-- Menambahkan Deskripsi dengan batas maksimal 3 baris (line-clamp) -->
            <ion-card-content v-if="article.description">
              <ion-text class="text-gray-600 font-serif line-clamp-3 text-justify pt-2">
                {{ article.description }}
              </ion-text>
              <div class="flex justify-end pt-2 items-center gap-1">
                <ion-icon :icon="timeOutline"></ion-icon>
                <span>
                  {{ new Date(article.publishedAt).toLocaleDateString('id-ID') }}
                </span>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>
