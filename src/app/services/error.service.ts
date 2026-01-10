import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable, throwError } from 'rxjs';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private alertService: AlertService, private translationService: TranslationService) { }

  /**
   * A helper function that translates and shows an alert for error messages.
   * @param key The translation key for the error message.
   */
  private showError(key: string): void {
    const message = this.translationService.translateInstant(key);
    this.alertService.showAlert(message, 'error');
  }


  /**
   * Handles API errors by status code and displays appropriate error messages.
   * @param error The HttpErrorResponse object containing error details.
   */
  handleApiError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.showError('SERVICES.ERROR.UNAUTHORIZED');
    }
    return throwError(() => { });
  }


  /**
   * Handles HTTP errors based on status code and calls appropriate error handlers.
   * @param error The HttpErrorResponse object containing error details.
   * @param errorHandlers An object mapping HTTP status codes to error handling functions.
   */
  handleHttpError(error: HttpErrorResponse, errorHandlers: { [key: number]: (error: HttpErrorResponse) => void }): void {
    if (error.status === 0) {
      this.showError('SERVICES.ERROR.NO_RESPONSE');
    } else {
      const errorHandler = errorHandlers[error.status];
      if (errorHandler) {
        errorHandler(error);
      } else {
        this.showError('SERVICES.ERROR.UNEXPECTED');
      }
    }
  }


  /**
   * Handles register specific HTTP errors.
   * @param error The HttpErrorResponse object containing register error details.
   */
  handleRegisterError(error: HttpErrorResponse): void {
    const errorHandlers = {
      400: (error: HttpErrorResponse) => {
        this.showAlert('Email and password are required.');
      },
      409: (error: HttpErrorResponse) => {
        this.showAlert('This user already exists.');
      },
      500: (error: HttpErrorResponse) => {
        this.showAlert('Error creating user. Please try again later.');
      }
    };
    this.handleHttpError(error, errorHandlers);
  }


  /**
   * Handles login specific HTTP errors.
   * @param error The HttpErrorResponse object containing login error details.
   */
  handleLoginError(error: HttpErrorResponse): void {
    const errorHandlers = {
      400: (error: HttpErrorResponse) => {
        if (error.error.error === 'Please provide email or username and password') {
          this.showAlert('Please provide email or username and password.');
        } else if (error.error.error === 'Invalid email') {
          this.showAlert('Invalid email!');
        } else if (error.error.error === 'Invalid username') {
          this.showAlert('Invalid username!');
        } else {
          this.showAlert('An unexpected error occurred. Please try again later.');
        }
      },
      401: () => {
        this.showAlert('Invalid password!');
      },
      403: () => {
        this.showAlert('Not verified. Please verify your email first.');
      }
    };
    this.handleHttpError(error, errorHandlers);
  }


  /**
   * Handles send mail specific HTTP errors.
   * @param error The HttpErrorResponse object containing send mail error details.
   */
  handleSendMailError(error: HttpErrorResponse): void {
    const errorHandlers = {
      400: (error: HttpErrorResponse) => {
        this.showAlert('No existing user with the given email.');
      }
    };
    this.handleHttpError(error, errorHandlers);
  }


  /**
   * Handles reset password specific HTTP errors.
   * @param error The HttpErrorResponse object containing reset password error details.
   */
  handleResetPasswordError(error: HttpErrorResponse): void {
    const errorHandlers = {
      400: (error: HttpErrorResponse) => {
        this.showAlert('No existing user with the given email.');
      }
    };
    this.handleHttpError(error, errorHandlers);
  }


  /**
   * Handles update username specific HTTP errors.
   * @param {HttpErrorResponse} error - The HttpErrorResponse object containing update username error details.
   */
  handleUpdateUsernameError(error: HttpErrorResponse): void {
    const errorHandlers = {
      400: (error: HttpErrorResponse) => {
        this.alertService.showAlert('New username is required.', 'error');
      },
      409: (error: HttpErrorResponse) => {
        this.alertService.showAlert('Username already taken.', 'error');
      }
    };
    this.handleHttpError(error, errorHandlers);
  }


  /**
   * Handles contact form submission specific HTTP errors.
   * @param {HttpErrorResponse} error - The HttpErrorResponse object containing contact form error details.
   */
  handleContactError(error: HttpErrorResponse): void {
    const errorHandlers = {
      400: (error: HttpErrorResponse) => {
        this.alertService.showAlert('Invalid data submitted. Please check your inputs.', 'error');
      },
      500: (error: HttpErrorResponse) => {
        this.alertService.showAlert('Server error. Please try again later.', 'error');
      }
    };
    this.handleHttpError(error, errorHandlers);
  }


  /**
   * Displays an alert message using the AlertService.
   * @param message The message to display in the alert.
   */
  showAlert(message: string) {
    this.alertService.showAlert(message, 'error');
  }
}
