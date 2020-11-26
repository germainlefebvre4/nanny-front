<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Contract</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form
            v-model="valid"
            ref="form"
            lazy-validation
          >
            <v-text-field
              label="User ID"
              v-model.number="userId"
            ></v-text-field>
            <v-text-field
              label="Jours de garde dans la semaine"
              v-model="weekdays"
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
              v-model.number="priceDayMeals"
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
        <v-btn @click="reset">Reset</v-btn>
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
import { IUserContractUpdate } from '@/interfaces';
import { readUserProfile, readContract } from '@/store/main/getters';
import { dispatchGetContract, dispatchUpdateUserContract } from '@/store/main/actions';

@Component
export default class UserContractEdit extends Vue {
  public valid = true;
  public weekdays = '';
  public contractId: number = 0;
  public weeks: number = 0;
  public hours: number = 0;
  public priceHourStandard: number = 0;
  public priceHourExtra: number = 0;
  public priceDayFees: number = 0;
  public priceDayMeals: number = 0;
  public dateStart: string = '';
  public dateEnd: string = '';
  public nannyId: number = 0;
  public userId: number = 0;

  public async mounted() {
    this.contractId = parseInt(this.$router.currentRoute.params.id, 10);
    await dispatchGetContract(this.$store, this.contractId);
    this.reset();
  }

  public created() {
    const userProfile = readUserProfile(this.$store);
    if (userProfile) {
      this.userId = userProfile.id;
    }
  }

  get userContract() {
    return readContract(this.$store);
  }

  public reset() {
    this.$validator.reset();
    if (this.userContract) {
      this.weekdays = this.userContract.weekdays;
      this.weeks = this.userContract.weeks;
      this.priceHourStandard = this.userContract.price_hour_standard;
      this.priceHourExtra = this.userContract.price_hour_extra;
      this.priceDayFees = this.userContract.price_fees;
      if (this.userContract.price_meals) {
        this.priceDayMeals = this.userContract.price_meals;
      }
      if (this.userContract.start) {
        this.dateStart = this.userContract.start;
      }
      if (this.userContract.end) {
        this.dateEnd = this.userContract.end;
      }
      if (this.userContract.user_id) {
        this.userId = this.userContract.user_id;
      }
      if (this.userContract.nanny_id) {
        this.nannyId = this.userContract.nanny_id;
      }
    }
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if ((this.$refs.form as any).validate()) {
      const weekdaysMapping = {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
      };
      const updatedWeekdaysList: string[] = [];
      for (const [key, value] of Object.entries(this.weekdays)) {
        if (value) {
          updatedWeekdaysList.push(weekdaysMapping[key]);
        }
      }
      const updatedWeekdays = updatedWeekdaysList.join(' ');
      const updatedContract: IUserContractUpdate = {
        weekdays: updatedWeekdays,
        weeks: this.weeks,
        hours: this.hours,
        price_hour_standard: this.priceHourStandard,
        price_hour_extra: this.priceHourExtra,
        price_fees: this.priceDayFees,
        user_id: this.userId,
        nanny_id: this.nannyId,
      };
      if (this.priceDayMeals) {
        updatedContract.price_meals = this.priceDayMeals;
      }
      if (this.dateStart) {
        updatedContract.start = this.dateStart;
      }
      if (this.dateEnd) {
        updatedContract.end = this.dateEnd;
      }
      await dispatchUpdateUserContract(this.$store, updatedContract);
      this.$router.push('/main/contracts');
    }
  }
}
</script>
