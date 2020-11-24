<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Create new contract</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="User ID"
              v-model.number="userId"
            ></v-text-field>
            <v-text-field
              label="Jours de garde dans la semaine"
              v-model="weekDays"
              required
            ></v-text-field>
            <v-text-field
              label="Nombre de semaines dans l'année"
              v-model.number="weeks"
              required
            ></v-text-field>
            <v-text-field
              label="Nombre minimum d'heures hebdomadaires"
              v-model.number="hours"
              required
            ></v-text-field>
            <v-text-field
              label="Prix d'une heure normale (<45h)"
              v-model.number="priceHourStandard"
              required
            ></v-text-field>
            <v-text-field
              label="Prix d'une heure supplémentaire (>45h)"
              v-model.number="priceHourExtra"
              required
            ></v-text-field>
            <v-text-field
              label="Prix des frais d'entretien"
              v-model.number="priceDayFees"
              required
            ></v-text-field>
            <v-text-field
              label="Prix du repas"
              v-model.number="priceMeals"
            ></v-text-field>
            <v-text-field
              label="Date de début de contrat"
              v-model="dateStart"
            ></v-text-field>
            <v-text-field
              label="Date de fin de contrat"
              v-model="dateEnd"
            ></v-text-field>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IUserContractCreate } from '@/interfaces';
import { readUserProfile } from '@/store/main/getters';
import { dispatchUpdateUserContract } from '@/store/main/actions';

@Component
export default class UserProfileEdit extends Vue {
  public valid = true;
  public weekDays: string = '';
  public weeks: number = 0;
  public hours: number = 0;
  public priceHourStandard: number = 0;
  public priceHourExtra: number = 0;
  public priceDayFees: number = 0;
  public priceHourMeals: number = 0;
  public dateStart: string = '';
  public dateEnd: string = '';
  public nannyId: number = 0;
  public userId: number = 0;

  public created() {
    const userProfile = readUserProfile(this.$store);
    if (userProfile) {
      this.userId = userProfile.id;
    }
  }

  get userProfile() {
    return readUserProfile(this.$store);
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if ((this.$refs.form as any).validate()) {
      const updatedContract: IUserContractCreate = {
        weekdays: this.weekDays,
        weeks: this.weeks,
        hours: this.hours,
        price_hour_standard: this.priceHourStandard,
        price_hour_extra: this.priceHourExtra,
        price_fees: this.priceDayFees,
        user_id: this.userId,
        nanny_id: this.nannyId,
      };
      if (this.priceHourMeals) {
        updatedContract.price_meals = this.priceHourMeals;
      }
      if (this.dateStart) {
        updatedContract.start = new Date(this.dateStart);
      }
      if (this.dateEnd) {
        updatedContract.end = new Date(this.dateEnd);
      }
      await dispatchUpdateUserContract(this.$store, updatedContract);
      this.$router.push('/main/contracts');
    }
  }
}
</script>
