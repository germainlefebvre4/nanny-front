<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="contracts"
      :sort-by.sync="pagination.sortBy"
      :sort-desc.sync="pagination.sortDesc"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Gérer mes contrats</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
                color="primary"
                dark
                class="mb-2"
                to="/main/contracts/create"
              >
                Créer un contrat
              </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.weekdays`]="{ item }">
        {{ mapWeekdaysToPretty(item.weekdays) }}
      </template>
      <template v-slot:[`item.duration_mode`]="{ item }">
        {{ durationModeLabel(item.duration_mode) }}
      </template>
      <template v-slot:[`item.price_hour_standard`]="{ item }">
        {{ item.price_hour_standard }} €
      </template>
      <template v-slot:[`item.price_fees`]="{ item }">
        {{ item.price_fees }} €
      </template>
      <template v-slot:[`item.price_meals`]="{ item }">
        <v-simple-checkbox
          v-model="item.price_meals"
          disabled
        ></v-simple-checkbox>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn slot="activator" text :to="{name: 'main-contracts-calendar', params: {id: item.id}}">
          <v-icon>mdi-calendar-month</v-icon>
        </v-btn>
        <v-btn slot="activator" text :to="{name: 'main-contracts-edit', params: {id: item.id}}">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
        <v-btn slot="activator" text @click="showDeleteDialog(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteContractDialog" max-width="500px">
      <v-card>
        <v-card-title>Supprimer</v-card-title>
        <v-card-text>Confirmer la suppression</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="deleteContractDialog = false">Fermer</v-btn>
          <v-btn color="primary" text @click="deleteContract()">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { readUserProfile, readContracts } from '@/store/main/getters';
import { dispatchGetContracts, dispatchRemoveContract } from '@/store/main/actions';

@Component
export default class UserContracts extends Vue {

  public test = {enabled: true};
  public pagination = {sortBy: 'start', sortDesc: true};
  public headers = [
    {
      text: 'Enfant',
      sortable: true,
      value: 'child',
      align: 'center',
    },
    {
      text: '#Sem/An',
      sortable: true,
      value: 'weeks',
      align: 'center',
    },
    {
      text: '#Heures/Sem',
      sortable: true,
      value: 'hours',
      align: 'center',
    },
    {
      text: 'Prix/Heure',
      sortable: true,
      value: 'price_hour_standard',
      align: 'center',
    },
    {
      text: 'Frais/Jour',
      sortable: true,
      value: 'price_fees',
      align: 'center',
    },
    {
      text: 'Repas',
      sortable: true,
      value: 'price_meals',
      align: 'center',
    },
    {
      text: 'Start',
      sortable: true,
      value: 'start',
      align: 'center',
    },
    {
      text: 'End',
      sortable: true,
      value: 'end',
      align: 'center',
    },
    {
      text: 'Déclaration',
      sortable: true,
      value: 'duration_mode',
      align: 'center',
    },
    {
      text: 'Actions',
      value: 'actions',
      align: 'center',
      sortable: false,
    },
  ];

  public deleteContractId;
  public deleteContractDialog: boolean = false;


  get contracts() {
    return readContracts(this.$store);
  }

  public async mounted() {
    await dispatchGetContracts(this.$store);
  }

  public showDeleteDialog(item) {
      this.deleteContractId = item;
      this.deleteContractDialog = !this.deleteContractDialog;
  }

  public async deleteContract() {
      await dispatchRemoveContract(this.$store, this.deleteContractId);
      await dispatchGetContracts(this.$store);
      this.deleteContractDialog = !this.deleteContractDialog;
      delete this.deleteContractId;
  }

  public is_meals_enabled(item) {
    if (item) {
      return true;
    } else {
      return false;
    }
  }

  public mapWeekdaysToPretty(items) {
    Vue.delete(items, 'enabled');
    console.log(items);
    const weekdaysMapping = {
      Mon: 'Lundi',
      Tue: 'Mardi',
      Wed: 'Mercredi',
      Thu: 'Jeudi',
      Fri: 'Vendredi',
      Sat: 'Samedi',
      Sun: 'Dimanche',
    };
    const weekdays: string[] = [];
    for (const [key, value] of Object.entries(items)) {
      weekdays.push(weekdaysMapping[key]);
    }
    return weekdays.length;
  }

  public durationModeLabel(item) {
    if(item == 'free') {
      return 'Libre';
    } else if (item == 'daily') {
      return 'Journalière';
    }
  }

}
</script>