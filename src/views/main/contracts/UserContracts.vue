<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Manage Contracts
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/contracts/create">Create Contract</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="contracts">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.user_id }}</td>
        <td>{{ props.item.nanny_id }}</td>
        <td>{{ props.item.start }}</td>
        <td>{{ props.item.end }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Edit</span>
            <v-btn slot="activator" flat :to="{name: 'main-contracts-edit', params: {id: props.item.id}}">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { readUserProfile, readContracts } from '@/store/main/getters';
import { dispatchGetContracts } from '@/store/main/actions';

@Component
export default class UserContracts extends Vue {
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

  get contracts() {
    return readContracts(this.$store);
  }

  public async mounted() {
    await dispatchGetContracts(this.$store);
  }

}
</script>
