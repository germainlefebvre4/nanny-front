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
        {{ item.weekdays.split(" ").length }}
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
          <v-btn color="primary" text @click="deleteContractDialog = false">Close</v-btn>
          <v-btn color="primary" text @click="deleteItem()">Delete</v-btn>
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
      text: 'Nanny',
      sortable: true,
      value: 'nanny.firstname',
      align: 'center',
    },
    {
      text: '#Sem/An',
      sortable: true,
      value: 'weeks',
      align: 'center',
    },
    {
      text: '#Jours/Sem',
      sortable: true,
      value: 'weekdays',
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
      text: 'Actions',
      value: 'actions',
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

  public async deleteItem() {
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

}
</script>