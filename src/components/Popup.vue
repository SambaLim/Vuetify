<template>
    <v-dialog max-width="800px" v-model="dialog">
        <v-btn slot="activator" class="success">Add new project</v-btn>
        <v-card>
            <v-card-title>
                <h2>Add a New Project</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Project title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
                    <v-menu>
                        <v-text-field :rules="inputRules" :value="due" slot="activator" label="Due date" prepend-icon="date_range"></v-text-field>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    <v-btn flat class="success mx-0 mt-3 right" @click="submit" :loading="btnLoading">Add project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import db from '@/fb'

export default {
    data() {
        return {
            title: '',
            content: '',
            due: '',
            inputRules: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
            btnLoading: false,
            dialog: false,
        }
    },
    methods: {
        submit() {
            if(this.$refs.form.validate()) {
                this.btnLoading = true;

                const project = {
                    title: this.title,
                    content: this.content,
                    due: this.due,
                    person: 'Test Samba',
                    status: 'ongoing',
                }

                db.collection('projects').add(project).then(() => {
                    this.btnLoading = false;
                    this.dialog = true;
                })
            }
        }
    }
}
</script>
