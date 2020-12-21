<template>
  <v-container>
    <v-card class="ma-3 pa-3" max-width="800px" style="margin-left: 0px;">
      <v-card-title primary-title>
        <div class="headline primary--text">{{ title }}</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="User ID"
              v-model.number="userId"
              disabled
            ></v-text-field>


            <v-subheader>* Rattacher la nounou avec son adresse email</v-subheader>
            <v-layout wrap fill-height>
              <v-flex grow>
                <v-text-field
                  v-model="nannyEmail"
                  label="Adresse email"
                  :color="checkNannyEntity(nanny)?'success':'red'"
                ></v-text-field>
              </v-flex>
              <v-flex grow>
                <v-btn
                  @click="searchNannyByEmail"
                >Rechercher</v-btn>
              </v-flex>
              <v-flex grow>
                <v-text-field
                  label="Prénom de la Nounou"
                  :value="checkNannyEntity(nanny)?nanny.firstname:''"
                  :color="checkNannyEntity(nanny)?'success':'red'"
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-subheader>* Jours de présence semaine</v-subheader>
            <v-layout wrap fill-height>
              <v-flex grow>
                <v-checkbox
                  v-model="weekdays.monday"
                  type="boolean"
                  label="Lundi"
                ></v-checkbox>
              </v-flex>
              <v-flex grow>
                <v-checkbox
                  v-model="weekdays.tuesday"
                  type="boolean"
                  label="Mardi"
                ></v-checkbox>
              </v-flex>
              <v-flex grow>
                <v-checkbox
                  v-model="weekdays.wednesday"
                  type="boolean"
                  label="Mercredi"
                ></v-checkbox>
              </v-flex>
              <v-flex grow>
                <v-checkbox
                  v-model="weekdays.thursday"
                  type="boolean"
                  label="Jeudi"
                ></v-checkbox>
              </v-flex>
              <v-flex grow>
                <v-checkbox
                  v-model="weekdays.friday"
                  type="boolean"
                  label="Vendredi"
                ></v-checkbox>
              </v-flex>
              <v-flex grow>
                <v-checkbox
                  v-model="weekdays.saturday"
                  type="boolean"
                  label="Samedi"
                ></v-checkbox>
              </v-flex>
              <v-flex grow>
                <v-checkbox
                  v-model="weekdays.sunday"
                  type="boolean"
                  label="Dimanche"
                ></v-checkbox>
              </v-flex>
            </v-layout>

            <v-subheader>* Nombre de semaines dans l'année</v-subheader>
            <v-layout wrap fill-height>
              <v-flex>
                <v-slider
                  v-model.number="weeks"
                  thumb-label="always"
                  min=0
                  max=47
                  step="1"
                  required
                ></v-slider>
              </v-flex>
              <v-flex shrink class="hidden-sm-and-down" style="width: 60px; margin-left: 15px;">
                <v-text-field
                  v-model.number="weeks"
                  type="number"
                  hide-details
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-subheader>* Nombre d'heures hebdomadaires</v-subheader>
            <v-layout wrap fill-height>
              <v-flex>
                <v-slider
                  v-model.number="hours"
                  thumb-label="always"
                  min=0
                  max=70
                  step="1"
                  :rules="validateHours"
                  required
                ></v-slider>
              </v-flex>
              <v-flex shrink class="hidden-sm-and-down" style="width: 60px; margin-left: 15px;">
                <v-text-field
                  v-model.number="hours"
                  type="number"
                  hide-details
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-subheader>* Prix net heure normale (< 45h/semaine)</v-subheader>
            <v-layout wrap fill-height>
              <v-flex>
                <v-slider
                  v-model.number="priceHourStandard"
                  thumb-label="always"
                  min=0
                  max=10
                  step="0.1"
                  :rules="validatePriceHourStandard"
                  required
                ></v-slider>
              </v-flex>
              <v-flex shrink class="hidden-sm-and-down" style="width: 60px; margin-left: 15px;">
                <v-text-field
                  v-model.number="priceHourStandard"
                  type="number"
                  hide-details
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-subheader>* Prix net heure supplémentaires (> 45h/semaine)</v-subheader>
            <v-layout wrap fill-height>
              <v-flex>
              <v-slider
                v-model.number="priceHourExtra"
                thumb-label="always"
                min=0
                max=10
                step="0.1"
                :rules="validatePriceHourExtra"
                required
              ></v-slider>
              </v-flex>
              <v-flex shrink class="hidden-sm-and-down" style="width: 60px; margin-left: 15px;">
                <v-text-field
                  v-model.number="priceHourExtra"
                  type="number"
                  hide-details
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-subheader>* Prix net des frais d'entretien</v-subheader>
            <v-layout wrap fill-height>
              <v-flex>
                <v-slider
                  v-model.number="priceDayFees"
                  thumb-label="always"
                  min=0
                  max=10
                  step="0.01"
                  :rules="validatePriceDayFees"
                  required
                ></v-slider>
              </v-flex>
              <v-flex shrink style="width: 60px; margin-left: 15px;">
                <v-text-field
                  v-model.number="priceDayFees"
                  type="number"
                  hide-details
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-subheader>Prix net des frais de repas</v-subheader>
            <v-layout wrap fill-height>
              <v-flex>
                <v-slider
                  v-model.number="priceDayMeals"
                  thumb-label="always"
                  min=0
                  max=10
                  step="0.1"
                  :rules="validatePriceDayMeals"
                ></v-slider>
              </v-flex>
              <v-flex shrink class="hidden-sm-and-down" style="width: 60px; margin-left: 15px;">
                <v-text-field
                  v-model.number="priceDayMeals"
                  type="number"
                  hide-details
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 sm6 md6>
                <v-menu
                  ref="menuDateStart"
                  v-model="menuDateStart"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateStart"
                      label="Date de début de contrat"
                      prepend-icon="mdi-calendar-cursor"
                      v-on="on"
                      :rule="validateDateStart"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateStart" @input="menuDateStart = false"></v-date-picker>
                </v-menu>
              </v-flex>
              
              <v-flex xs12 sm6 md6>
                <v-menu
                  ref="menuDateEnd"
                  v-model="menuDateEnd"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateEnd"
                      label="Date de fin de contrat"
                      prepend-icon="mdi-calendar-cursor"
                      v-on="on"
                      :rule="validateDateEnd"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateEnd" @input="menuDateEnd = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>

          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Annuler</v-btn>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          {{ editMode ? 'Enregistrer' : 'Créer le contrat'}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IUserContract, INanny } from '@/interfaces';
import { readUserProfile, readContract, readSearchNanny } from '@/store/main/getters';
import { dispatchCreateUserContract, dispatchSearchNannyByEmail, dispatchGetContract, dispatchUpdateUserContract } from '@/store/main/actions';
import { Dictionary } from 'vue-router/types/router';

@Component
export default class UserContractCreateOrEdit extends Vue {
  public title: string = 'Créer un nouveau contrat';
  public valid = true;
  public weekdays = {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  };
  public nannyEmail: string = '';
  public nannyFirstname: string = '';

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
  public menuDateStart: boolean = false;
  public menuDateEnd: boolean = false;

  public contractId: number | null = null;
  private editMode = false;

  private validateNannyEmail = [
  ];
  private validateHours = [
  ];
  private validatePriceHourStandard = [
    (v) => v >= 2.85 || 'Le minmum légal est 2,85€',
    (v) => v <= 10 || 'Ca commence à faire beaucoup !',
  ];
  private validatePriceHourExtra = [
    (v) => v <= 8 || 'Le minmum légal est 2,85€',
    (v) => v <= 15 || 'Ca commence à faire beaucoup !',
  ];
  private validatePriceDayFees = [
    (v) => v >= 2.65 || 'Le minimum légal est 2.65€',
    (v) => v <= 10 || 'Ca commence à faire beaucoup !',
  ];
  private validatePriceDayMeals = [
    (v) => v <= 10 || 'Ca commence à faire beaucoup !',
  ];
  private validateDateStart = [
  ];
  private validateDateEnd = [
  ];

  public async mounted() {
    const userProfile = readUserProfile(this.$store);
    if (userProfile) {
      this.userId = userProfile.id;
    }
    this.editMode = this.$router.currentRoute.name === 'main-contracts-edit' ? true : false;
    if (this.editMode) {
      this.title = 'Modifier le contrat';
      this.contractId = parseInt(this.$router.currentRoute.params.id, 10);
      await dispatchGetContract(this.$store, this.contractId);
      this.setFormValues();
    }
  }

  get userProfile() {
    return readUserProfile(this.$store);
  }

  get userContract() {
    return readContract(this.$store);
  }

  get nanny() {
    return readSearchNanny(this.$store);
  }

  set nanny(nanny: INanny | null) {
    this.nanny = nanny;
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
      const updatedContract: IUserContract = {
        weekdays: updatedWeekdays,
        weeks: this.weeks,
        hours: this.hours,
        price_hour_standard: this.priceHourStandard,
        price_hour_extra: this.priceHourExtra,
        price_fees: this.priceDayFees,
        user_id: this.userId,
        nanny_id: this.nannyId,
        price_meals: this.priceDayMeals,
      };

      if (this.dateStart) {
        updatedContract.start = this.dateStart;
      }
      if (this.dateEnd) {
        updatedContract.end = this.dateEnd;
      }
      if (this.nanny?.id !== 0) {
        updatedContract.nanny_id = this.nanny?.id;
      }

      if (this.editMode) {
        updatedContract.id =  this.userContract.id;
      }

      this.editMode ?
        await dispatchUpdateUserContract(this.$store, updatedContract) :
        await dispatchCreateUserContract(this.$store, updatedContract);
      this.$router.push('/main/contracts');
    }
  }

  public async searchNannyByEmail() {
    const nanny = await this.setSearchNanny(this.nannyEmail);
    await this.getSearchNanny();
  }

  public getSearchNanny() {
    const nanny = readSearchNanny(this.$store);
    return nanny;
  }
  public setSearchNanny(nannyEmail) {
    dispatchSearchNannyByEmail(this.$store, nannyEmail);
  }

  public checkNannyEntity(n) {
    return true ? n : false;
  }

  public setWeekDays(values?: string[]) {
    return {
      monday: values?.includes('Mon') ? true : false,
      tuesday: values?.includes('Tue') ? true : false,
      wednesday: values?.includes('Wed') ? true : false,
      thursday: values?.includes('Thu') ? true : false,
      friday: values?.includes('Fri') ? true : false,
      saturday: values?.includes('Sat') ? true : false,
      sunday: values?.includes('Sun') ? true : false,
    };
  }

  private setFormValues() {
    const contract: IUserContract = this.userContract;
    const weekDays = contract.weekdays.split(' ');
    this.weekdays = this.setWeekDays(weekDays);
    this.weeks = contract.weeks;
    this.hours = contract.hours;
    this.priceHourStandard = contract.price_hour_standard;
    this.priceHourExtra = contract.price_hour_extra;
    this.priceDayFees = contract.price_fees;
    this.priceDayMeals = contract.price_meals || 0;
    this.dateStart = contract.start || '';
    this.dateEnd = contract.end || '';
    this.nannyId = contract.nanny_id || 0;
    this.userId = contract.user_id || 0;
  }

}
</script>

<style>
</style>