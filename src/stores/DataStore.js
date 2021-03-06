import { observable, action } from "mobx";
import axios from "axios";

const pathUrl = `https://recruitment.hal.skygate.io/companies`; // url to companies list
const detailsPathUrl = `https://recruitment.hal.skygate.io/incomes/`; // needs an id of company

class DataStore {
  @observable company = null;
  @observable companies = [];
  @observable companiesFiltered = [];
  @observable loading = false;
  @observable currentPage = 1;
  @observable companiesPerPage = 10;

  // download the data with API
  @action downloadCompanies = () => {
    let companies = [];
    this.loading = true;

    return axios.get(pathUrl).then(async response => {
      const data = response.data;

      await Promise.all(
        data.map(async company => {
          const idPath = detailsPathUrl + company["id"];
          await axios.get(idPath).then(resp => {
            const detailsData = resp.data;

            // count total income per company
            const totalIncome = detailsData["incomes"].reduce(
              (prevObj, currObj) => ({
                value: parseFloat(prevObj.value) + parseFloat(currObj.value)
              })
            );

            const updatedCompany = {
              ...company,
              incomes: detailsData["incomes"],
              totalIncome: totalIncome.value.toFixed(2)
            };

            companies.push(updatedCompany);
          });
        })
      ).catch(e => console.log(`Error! ${e.message}`));

      // sorting
      companies.sort((prevObj, currentObj) =>
        prevObj.totalIncome >= currentObj.totalIncome ? -1 : 1
      );
      this.companies = companies;
      this.companiesFiltered = companies;

      this.loading = false;
    });
  };

  // change page
  @action paginate = number => {
    this.currentPage = number;
  };

  // filter table of companies by name
  @action filter = name => {
    let companiesUpdated = this.companies;
    companiesUpdated = companiesUpdated.filter(company => {
      return company["name"].toLowerCase().search(name.toLowerCase()) !== -1;
    });

    this.companiesFiltered = companiesUpdated;
  };

  @action selectCompany = id => {
    this.company = this.companies.find(
      company => parseInt(company.id) === parseInt(id)
    );
  };

  averageIncome = (dateStart = 0, dateEnd = 0) => {
    // if(dateStart === 0 && dateEnd === 0) {

    if (this.company === null) return 0;

    let counter = 0;
    const averIncome = this.company.incomes.reduce((prevIncome, currIncome) => {
      counter += 1;
      return {
        value: parseFloat(prevIncome.value) + parseFloat(currIncome.value)
      };
    });

    return (averIncome.value / counter).toFixed(2);
  };

  totalIncome = (dateStart = 0, dateEnd = 0) => {
    // if(dateStart === 0 && dateEnd === 0) {
    if (this.company === null) return 0;

    // count total income per company
    const totalIncome = this.company.incomes.reduce((prevObj, currObj) => ({
      value: parseFloat(prevObj.value) + parseFloat(currObj.value)
    }));
    return totalIncome.toFixed(2);
  };

  lastMonthIncome = () => {
    if (this.company === null) return 0;

    const date = new Date();
    let income = 0;

    this.company.incomes.forEach(data => {
      const incomeDate = new Date(data.date);

      if (date.getMonth() === 0) {
        if (
          incomeDate.getMonth() !== 11 ||
          incomeDate.getFullYear() !== date.getFullYear() - 1
        ) {
          return;
        }
      }

      if (
        incomeDate.getMonth() !== date.getMonth() - 1 ||
        incomeDate.getFullYear() !== date.getFullYear()
      ) {
        return;
      }

      income += data.value;
    });

    return income.toFixed(2);
  };
}

const store = new DataStore();
export default store;
