import { init } from 'onfido-sdk-ui';
import React from 'react';

interface OnboardingState {
  firstname: string;
  lastname: string;
  dob: string;
  kycToken: string;
  kycCheckStatus: string;
  errors: any;
  onfido: any;
  [key: string]: any;
}

export interface OnboardingProps {
  kycSubmitted: boolean;
  kycCompleted: boolean;
  setKycSubmitted: any;
  user: any;
}

export class Onboarding extends React.Component<OnboardingProps, OnboardingState> {
  private Onfido;
  constructor(props: OnboardingProps) {
    super(props);
    this.createApplicant = this.createApplicant.bind(this);
    this._submit = this._submit.bind(this);
    this.state = {
      kycToken: '',
      kycCheckStatus: '',
      firstname: '',
      lastname: '',
      dob: '',
      errors: {},
      onfido: null
    };
  }

  public async componentDidMount () {
    this.Onfido = await import('onfido-sdk-ui');
  }

  public render() {
    // TODO: Change text based on KycCheckStatus, if "complete", show success and button to move forward. if "incomplete", alert user it will take some review time and provide a button to move forward.
    const header = <div className="d-flex flex-column align-items-center"><img src="/images/onboarding/kyc.svg" /><h5>KYC Required</h5></div>;
    return (
      <>
        <form className="kyc-form" onSubmit={this._submit}>
          <div className="form-group">
            <input
              type="text"
              name="firstname"
              required={true}
              className="form-control"
              value={this.state.firstname}
              onChange={this._onChangeHandler.bind(this)}
              placeholder="First Name"
              tabIndex={1}
            />
            <div className="error-container error-message">
              {this.state.errors && this.state.errors.firstname
                ? this.state.errors.firstname
                : null}
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastname"
              required={true}
              className="form-control"
              value={this.state.lastname}
              onChange={this._onChangeHandler.bind(this)}
              placeholder="Last Name"
              tabIndex={2}
            />
            <div className="error-container error-message">
              {this.state.errors && this.state.errors.lastname
                ? this.state.errors.lastname
                : null}
            </div>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dob"
              required={true}
              className={'form-control ' + (this.state.dob !== '' ? 'has-value' : '')}
              value={this.state.dob}
              onChange={this._onChangeHandler.bind(this)}
              placeholder="Date of Birth"
              tabIndex={3}
            />
            <div className="error-container error-message">
              {this.state.errors && this.state.errors.lastname
                ? this.state.errors.lastname
                : null}
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-submit" tabIndex={4}>
              Start KYC
            </button>
            <div className="error-container error-message">
              {this.state.errors && this.state.errors.default
                ? this.state.errors.default
                : null}
            </div>
          </div>
        </form>
        <div id="onfido-mount"></div>
      </>
    );
  }
  private _onChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }
  private _submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.createApplicant();
  }
  private initSDK(kycToken: string = this.state.kycToken, isModalOpen: boolean = true){
    const onfido = this.Onfido.init({
      // the JWT token that you generated earlier on
      token: kycToken,
      useModal: true,
      isModalOpen: true,
      // id of the element you want to mount the component on
      containerId: 'onfido-mount',
      onModalRequestClose() {
          // Update options with the state of the modal
          onfido.setOptions({isModalOpen: false})
      },
      onComplete: (data: any) => {
        const response = data;
        this.createCheck();
        onfido.tearDown()
      }
    });
    this.setState({onfido});
  }
  private async createCheck(){
    this.setState({kycCheckStatus: 'PASSED'});
  }
  private async createApplicant(){
    this.initSDK(this.state.kycToken, true)
  }
}
