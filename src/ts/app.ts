import { esriPromise } from 'esri-promise';
import { Promise } from 'es6-promise';
import BoilerFactory from './boilerplate/boilerplate';
import ApplicationFactory from './application/application';

esriPromise([
  'dojo/text!config/appConfig.json',
  'dojo/text!config/boilerplateSettings.json'
]).then(([appConfig, boilerplateSettings]) => {
  ApplicationFactory().then((AppInstance) => {
    BoilerFactory(JSON.parse(appConfig), JSON.parse(boilerplateSettings))
    .then((BoilerInstance) => {
      BoilerInstance.init()
      .then((boilerplateResponse) => {
        AppInstance.init(boilerplateResponse);
      })
    }).catch(Promise.reject)
  }).catch(Promise.reject)
}).catch((err) => {
  console.error(err);
})