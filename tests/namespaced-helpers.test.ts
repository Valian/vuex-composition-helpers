import Vuex, {Module} from 'vuex';
import {shallowMount} from '@vue/test-utils';

import {createNamespacedHelpers} from '../src/namespaced';

describe('"createNamespacedHelpers" - generic namespaced helpers', () => {
	describe('when created helpers outside of component', () => {
		it('should get getters', () => {
			const value = 'getter-demo' + Math.random();

			const storeModule: Module<any, any> = {
				namespaced: true,
				getters: {
					valGetter: () => value
				}
			};
			const store = new Vuex.Store({
				modules: {
					foo: storeModule
				}
			});

			const {useGetters} = createNamespacedHelpers('foo');

			const wrapper = shallowMount({
					template: '<div>{{valGetter}}</div>',
					setup() {
						const {valGetter} = useGetters(['valGetter']);
						return {
							valGetter
						}
					}
				},
				{
					global: {
						plugins: [store]
					}
				}
			);

			expect(wrapper.text()).toBe(store.getters['foo/valGetter']);
			expect(wrapper.text()).toBe(value);
		})

		it('should get strict getters', () => {
			interface ModuleGetter {
				valGetter: string;
			}
			const value = 'getter-demo' + Math.random();

			const storeModule: Module<any, any> = {
				namespaced: true,
				getters: {
					valGetter: () => value
				}
			};
			const store = new Vuex.Store({
				modules: {
					foo: storeModule
				}
			});

			const {useGetters} = createNamespacedHelpers<any, ModuleGetter>('foo');

			const wrapper = shallowMount({
					template: '<div>{{valGetter}}</div>',
					setup() {
						const {valGetter} = useGetters(['valGetter']);
						return {
							valGetter
						}
					}
				},
				{
					global: {
						plugins: [store]
					}
				}
			);

			expect(wrapper.text()).toBe(store.getters['foo/valGetter']);
			expect(wrapper.text()).toBe(value);
		})

	})
});
