//Lib
import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/akryum:vue';
import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//Main app
Vue.use(elementUi);

import App from '../import/ui/MainApp.vue';


Meteor.startup(() => {
  new Vue({
    el: "#app",
    replace: true,
    // component : App,
     render: h => h(App),
  });
});
