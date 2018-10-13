import {Vue} from 'vue-property-decorator';
import {typedStore} from './store';

export default class MyVue extends Vue {

  get store() {
    return typedStore(this.$store);
  }

}
