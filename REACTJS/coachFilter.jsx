import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { translate, Trans } from 'react-i18next';

class CoachFilter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { t, i18n } = this.props;
        let specialties = this.props.specialties.map(
            (specialty, index) => 
            <option id={ specialty.id } value={ specialty.id } key={ index } >
                { t(specialty.name) }
            </option>
        );
        let languages = this.props.languages.map(
            (language, index) => 
            <option id={ language.id } value={ language.id } key={ index } >
                { t(language.name) }
            </option>
        );
        let priceRange = this.props.priceRange.map(
            (priceRange, index) =>
            <option id={ priceRange.id } value={ priceRange.id } key={ index } >
                { t(priceRange.name) }
            </option>
        );

        return(
            <form className="form" onSubmit={ this.props.filter }>
                <div className="row mb-3 text-white align-items-end" style={{backgroundColor: 'rgb(22,49,68,0.5)',borderRadius:'20px'}}>
                    <div className="col-sm-4" style={{ marginBottom:'10px'}}>
                        <label className="h2 text-white">
                            { t('look for a coach') }
                        </label>
                    </div>
                    <div className="col-sm-8" style={{ marginBottom:'10px'}}>
                        <div className="row align-items-end" >
                            <div className="col">
                                <label className="" htmlFor="specialty">{ t('specialty') }</label>

                                <select id="specialty" name="specialty" className="form-control form-control-sm">
                                    <option value="">{t('no filtering')}</option>
                                    { specialties }
                                </select>
                            </div>
                            <div className="col">
                                <label className="d-block" htmlFor="language">{ t('language') }</label>
                                <select id="language" name="language" className="form-control form-control-sm">
                                    <option value="">{t('no filtering')}</option>
                                    { languages }
                                </select>
                            </div>
                            <div className="col">
                                <label className="d-block" htmlFor="priceRange">{ t('price range') }</label>

                                <select id="priceRange" name="priceRange" className="form-control form-control-sm">
                                    <option value="">{ t('no filtering') }</option>
                                    { priceRange }
                                </select>
                            </div>
                            <div className="col">
                                <button className="btn btn-sm btn-red" >
                                    <i className="fa fa-search fa-flip-horizontal text-muted"></i> { t('search') }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default translate('translations')(CoachFilter);
