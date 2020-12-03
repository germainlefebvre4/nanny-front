<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Gérer mes contrats
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/contracts/create">Créer un contrat</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="contracts"
      :rows-per-page-items='[10, 20, 50, {"text":"Tous","value":-1}]'
      v-bind:pagination.sync="pagination"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.user_id }}</td>
        <td>{{ props.item.nanny_id }}</td>
        <td>{{ props.item.start }}</td>
        <td>{{ props.item.end }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Calendrier</span>
            <v-btn slot="activator" flat :to="{name: 'main-contracts-calendar', params: {id: props.item.id}}">
              <v-icon>calendar_today</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>Modifier</span>
            <v-btn slot="activator" flat :to="{name: 'main-contracts-edit', params: {id: props.item.id}}">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
          <v-tooltip top>
            <span>Supprimer</span>
            <v-btn slot="activator" flat @click="showDeleteDialog(props.item.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-tooltip>
        </td>
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

  </div>
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
      text: 'User ID',
      sortable: true,
      value: 'user_id',
      align: 'left',
    },
    {
      text: 'Nanny ID',
      sortable: true,
      value: 'nanny_id',
      align: 'left',
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
      value: 'id',
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
