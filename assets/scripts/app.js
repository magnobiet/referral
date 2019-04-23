new Vue({
	el: '#app',
	data: {
		year: new Date().getFullYear(),
		categories: [],
		loading: true
	},
	methods: {
		sortBy(list, key = 'title') {

			list.sort((a, b) => {

				if (a[key] > b[key]) {
					return 1;
				}

				if (a[key] < b[key]) {
					return -1;
				}

				return 0;

			});

			return list;

		}
	},
	created() {

		this.loading = true;

		fetch('https://my-json-server.typicode.com/magnobiet/referral/categories?_embed=indications')
			.then((response) => response.json())
			.then((response) => {

				this.categories = response.map((category) => {

					category.indications = this.sortBy(category.indications);
					return category;

				});

			}).then(() => {
				this.loading = false;
			});

	}
});
