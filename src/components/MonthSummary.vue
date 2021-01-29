<template>
  <v-container class="ma-0 pa-0">
    <v-card flat>
      <v-card-title primary-title>
        <div class="headline primary--text">Afficher le mois {{ selectedMonthString }} {{ selectedYear }}</div>
      </v-card-title>
    </v-card>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card
            class="ma-3 pa-3"
          >
            <v-card-title primary-title>
              <div class="headline primary--text">Résumé</div>
            </v-card-title>

            <v-card-text>
              <v-list
                dense
              >
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="(day, i) in days"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="day.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title v-text="day.text"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      {{ day.value }}
                    </v-list-item-icon>

                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-list
                dense
              >
                <v-subheader>Recapitulatif des jours</v-subheader>
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="(day, i) in daysRecap"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="day.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title v-text="day.text"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      {{ day.value }}
                    </v-list-item-icon>

                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-list
                dense
              >
                <v-subheader>Recapitulatif des heures</v-subheader>
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="(hour, i) in hoursRecap"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="hour.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title v-text="hour.text"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      {{ hour.value }}
                    </v-list-item-icon>

                  </v-list-item>
                </v-list-item-group>
              </v-list>

            </v-card-text>

          </v-card>
        </v-flex>
        <v-flex xs12 md6>

          <v-card
            class="ma-3 pa-3"
          >
            <v-card-title primary-title>
              <div class="headline primary--text">Pajemploi</div>
            </v-card-title>

            <v-card-text>
              <v-list
                dense
              >
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, i) in pajeEmploi"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      {{ item.value }}
                    </v-list-item-icon>

                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>

  </v-container>

</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

interface RecapItem {
  text: string;
  icon: string;
  value: number;
}

@Component
export default class MonthSummary extends Vue {
  @Prop()
  public summary;

  public days: RecapItem[] = [];
  public daysRecap: RecapItem[] = [];
  public hoursRecap: RecapItem[] = [];
  public pajeEmploi: RecapItem[] = [];

  @Watch('summary', {immediate: true}) private onSummaryChanged() {
    this.mapSummary(this.summary);
  }

  private mapSummary(summary) {
    this.days = [
      { text: 'Jours ouvrés', icon: 'mdi-calendar-today', value: summary.business_days},
      { text: 'Jours travaillés', icon: 'mdi-calendar-today', value: summary.working_days },
    ];

    this.daysRecap = [
      { text: 'Présence enfant', icon: 'mdi-account-check-outline', value: summary.presence_child},
      { text: 'Absence enfant', icon: 'mdi-account-alert-outline', value: summary.absence_child },
      { text: 'Maladie enfant', icon: 'mdi-account-cancel-outline', value: summary.disease_child },
      { text: 'Maladie nounou', icon: 'mdi-account-check', value: summary.disease_nanny },
      { text: 'Congés parents', icon: 'mdi-account-child-outline', value: summary.daysoff_child },
      { text: 'Congés nounou', icon: 'mdi-account-child', value: summary.daysoff_nanny },
    ];

    this.hoursRecap = [
      { text: 'Heures normales', icon: 'mdi-clock-outline', value: summary.hours_standard},
      { text: 'Heures complémentaires', icon: 'mdi-clock-fast', value: summary.hours_complementary },
      { text: 'Heures majorées', icon: 'mdi-clock-check-outline', value: summary.hours_extra },
    ];

    this.pajeEmploi = [
      { text: 'Heures normales', icon: 'mdi-clock-outline', value: summary.hours_standard },
      { text: 'Jours d\'activité', icon: 'mdi-calendar-today', value: summary.working_days },
      { text: 'Congés nounou', icon: 'mdi-account-child', value: summary.daysoff_nanny },
      { text: 'Salaire horaire net', icon: 'mdi-currency-eur', value: summary.price_hour_standard },
      { text: 'Heures complémentaires', icon: 'mdi-clock-fast', value: summary.hours_complementary },
      { text: 'Heures majorées', icon: 'mdi-clock-check-outline', value: summary.hours_extra },
      { text: 'Salaire mensuel', icon: 'mdi-currency-eur', value: summary.monthly_salary },
      { text: 'Frais entretien', icon: 'mdi-lighthouse', value: summary.monthly_fees },
    ];
  }
}
</script>

<style scoped>

</style>
