<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Tableau de bord</div>
      </v-card-title>
      <v-card-text>
        <div class="headline font-weight-light ma-5">Aujourd'hui nous sommes le {{ getTodayFullDate() }}</div>
      </v-card-text>
      <v-card-actions>
      <v-divider></v-divider>
      </v-card-actions>

      <v-card-title primary-title>
        <div class="headline primary--text">Rappel(s)</div>
      </v-card-title>
      <v-card-text v-if="isReminderDeclarationPajemploi">
        <div class="headline font-weight-light ma-5">Déclaration Pajemploi</div>
        <div class="font-weight-light ma-5">{{ showReminderDeclarationPajemploi() }}</div>
      </v-card-text>
      <v-card-text v-if="!isReminderDeclarationPajemploi">
        <div class="headline font-weight-light ma-5">Pas de rappels.</div>
        <div class="font-weight-light ma-5">Vous trouverez ici vos rappels personnalisés.</div>
      </v-card-text>
      <v-card-actions>
      <v-divider></v-divider>
      </v-card-actions>

      <v-card-title primary-title>
        <div class="headline primary--text">Conseil(s)</div>
      </v-card-title>
      <v-card-text>
        <div class="headline font-weight-light ma-5">Pas de conseils pour aujourd'hui.</div>
        <div class="font-weight-light ma-5">Revenez régulièrement pour voir nos conseils personnalisés.</div>
      </v-card-text>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { readUserProfile } from '@/store/main/getters';

@Component
export default class Dashboard extends Vue {
  get greetedUser() {
    const userProfile = readUserProfile(this.$store);
    if (userProfile) {
      if (userProfile.firstname) {
        return userProfile.firstname;
      } else {
        return userProfile.email;
      }
    }
  }

  public getTodayFullDate() {
    const today = new Date();
    return today.toLocaleDateString('fr-FR');
  }

  public getTodayDayDate() {
    const today = new Date();
    return today.getDate();
  }

  public isReminderDeclarationPajemploi() {
    if (5 >= this.getTodayDayDate() && this.getTodayDayDate() >= 25) {
      return true;
    }
  }

  public showReminderDeclarationPajemploi() {
    return 'Avez-vous déclaré vos heures de garde d\'enfant ce mois-ci ?';
  }
}
</script>
