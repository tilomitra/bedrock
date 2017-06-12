import reactor from "../../reactor";
import CounterStore from "./stores/counter-store";
import Actions from "./actions";
import Getters from "./getters";

reactor.registerStores({
    counter: CounterStore
});

export default {
    actions: Actions,
    getters: Getters
};
