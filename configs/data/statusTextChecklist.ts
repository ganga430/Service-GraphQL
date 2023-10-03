export const statusTextChecklist = {
  priorToDayOfArrival: {
    notCompleteTitle: null,
    notCompleteCaption: 'Follow these steps to complete Mobile Check-In.',
    completeTitle: null,
    completeCaption: "You've completed Mobile Check-In. We'll see you soon!"
  },
  dayOfArrival: {
    notCompleteTitle: null,
    notCompleteCaption: 'Follow these steps to complete Mobile Check-In.',
    completeTitle: 'Your Room Will Be Ready Shortly!',
    completeCaption:
      "Rooms are usually ready around 3:00 PM. Your room number and Digital Key will be here as soon as they're available.",
    supplementaryCardTitle: 'Mobile Check-In Completed',
    supplementaryCardCaption: "You're all set. As soon as your room is ready, we'll let you know your room number."
  },
  idVerifyPending: 'Verify ID',
  idVerifyComplete: 'ID Verified',
  setEtaPending: 'Select Arrival',
  setEtaComplete: 'Arrival Selected',
  addPaymentPending: 'Add Payment Method',
  addPaymentComplete: 'Payment Method Added',
  addPaymentFailed: 'Payment Method Failed',
  sharedWithPending: 'Add Guests',
  sharedWithComplete: 'Guests Confirmed',
  expiringPayment: {
    priorToDayOfArrival: {
      completeTitle: null,
      completeCaption: 'Your payment method expires soon. Please tap the Edit button to update prior to arrival.'
    },
    dayOfArrival: {
      completeTitle: 'Update Your Payment Method',
      completeCaption: 'Your payment method is expiring soon. Please tap below to add a new one.',
      supplementaryCardTitle: 'Almost Done',
      supplementaryCardCaption: 'Please edit your payment method to complete Mobile Check-In.'
    }
  },
  failedPaymentCanRetry: {
    priorToDayOfArrival: {
      completeTitle: null,
      completeCaption:
        'We were unable to verify the payment method you provided. Please tap the Edit button below to add a new one.'
    },
    dayOfArrival: {
      completeTitle: 'Update Your Payment Method',
      completeCaption: 'We were unable to verify the payment method you provided. Please tap below to add a new one.',
      supplementaryCardTitle: 'Almost Done',
      supplementaryCardCaption: 'Please edit your payment method to complete Mobile Check-In.'
    }
  },
  failedPaymentCannotRetry: {
    priorToDayOfArrival: {
      completeTitle: null,
      completeCaption:
        'We were unable to verify the payment method you provided. Please see the Front Desk to complete check-in.'
    },
    dayOfArrival: {
      completeTitle: null,
      completeCaption: null,
      supplementaryCardTitle: 'Almost Done',
      supplementaryCardCaption: 'Please visit the front desk to complete check-in.'
    }
  }
};
