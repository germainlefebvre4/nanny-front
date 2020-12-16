<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="contracts"
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
          <v-icon>
            calendar_today
          </v-icon>
        </v-btn>
        <v-btn slot="activator" text :to="{name: 'main-contracts-edit', params: {id: item.id}}">
          <v-icon>
            edit
          </v-icon>
        </v-btn>
        <v-btn slot="activator" text @click="showDeleteDialog(item.id)">
          <v-icon>
            delete
          </v-icon>
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

  public pagination = {sortBy: 'start', descending: true};
  public headers = [
    {
      text: 'Parent',
      sortable: true,
      value: 'user.firstname',
      align: 'left',
    },
    {
      text: 'Nanny',
      sortable: true,
      value: 'nanny.firstname',
      align: 'left',
    },
    {
      text: '#Semaines/an',
      sortable: true,
      value: 'weeks',
      align: 'right',
    },
    {
      text: '#Jours/semaine',
      sortable: true,
      value: 'weekdays',
      align: 'right',
    },
    {
      text: '#Heures/semaine',
      sortable: true,
      value: 'hours',
      align: 'right',
    },
    {
      text: 'Prix/Heure',
      sortable: true,
      value: 'price_hour_standard',
      align: 'right',
    },
    {
      text: 'Frais/Jour',
      sortable: true,
      value: 'price_fees',
      align: 'right',
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
      align: 'left',
    },
    {
      text: 'End',
      sortable: true,
      value: 'end',
      align: 'left',
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

}
</script>
