/**
 * Payment Service Functions
 * 
 * Handles all payment-related operations including processing payments,
 * managing payment methods, handling refunds, and payment history.
 */

import { api } from './api';

export const paymentService = {
  // Initialize payment
  initializePayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/initialize', {
        bookingId: paymentData.bookingId,
        amount: paymentData.amount,
        currency: paymentData.currency || 'INR',
        paymentMethod: paymentData.paymentMethod, // 'card', 'upi', 'wallet', 'netbanking'
        description: paymentData.description || '',
        customerInfo: {
          name: paymentData.customerName,
          email: paymentData.customerEmail,
          phone: paymentData.customerPhone
        },
        metadata: paymentData.metadata || {}
      });

      if (response.success) {
        console.log('✅ Payment initialized:', response.data.paymentId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('❌ Initialize payment error:', error);
      throw error;
    }
  },

  // Process Razorpay payment
  processRazorpayPayment: async (paymentId, razorpayResponse) => {
    try {
      const response = await api.post('/payments/razorpay/verify', {
        paymentId,
        razorpayPaymentId: razorpayResponse.razorpay_payment_id,
        razorpayOrderId: razorpayResponse.razorpay_order_id,
        razorpaySignature: razorpayResponse.razorpay_signature
      });

      if (response.success) {
        console.log('✅ Razorpay payment processed:', paymentId);
        return response.data;
      } else {
        throw new Error(response.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('❌ Process Razorpay payment error:', error);
      throw error;
    }
  },

  // Process Stripe payment
  processStripePayment: async (paymentId, stripeToken) => {
    try {
      const response = await api.post('/payments/stripe/process', {
        paymentId,
        stripeToken: stripeToken.id,
        tokenType: stripeToken.type
      });

      if (response.success) {
        console.log('✅ Stripe payment processed:', paymentId);
        return response.data;
      } else {
        throw new Error(response.message || 'Payment processing failed');
      }
    } catch (error) {
      console.error('❌ Process Stripe payment error:', error);
      throw error;
    }
  },

  // Get payment status
  getPaymentStatus: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}/status`);
      if (response.success) {
        console.log('✅ Payment status loaded:', paymentId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to get payment status');
      }
    } catch (error) {
      console.error('❌ Get payment status error:', error);
      throw error;
    }
  },

  // Get payment history
  getPaymentHistory: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        status: filters.status || 'all',
        method: filters.method || 'all',
        dateFrom: filters.dateFrom || '',
        dateTo: filters.dateTo || '',
        page: filters.page || 1,
        limit: filters.limit || 20
      }).toString();

      const response = await api.get(`/payments/history?${queryParams}`);
      if (response.success) {
        console.log('✅ Payment history loaded:', response.data.payments.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load payment history');
      }
    } catch (error) {
      console.error('❌ Get payment history error:', error);
      throw error;
    }
  },

  // Add payment method
  addPaymentMethod: async (paymentMethodData) => {
    try {
      const response = await api.post('/payments/methods', {
        type: paymentMethodData.type, // 'card', 'upi', 'wallet'
        details: {
          cardNumber: paymentMethodData.cardNumber,
          expiryMonth: paymentMethodData.expiryMonth,
          expiryYear: paymentMethodData.expiryYear,
          cardholderName: paymentMethodData.cardholderName,
          upiId: paymentMethodData.upiId,
          walletProvider: paymentMethodData.walletProvider
        },
        isDefault: paymentMethodData.isDefault || false,
        nickname: paymentMethodData.nickname || ''
      });

      if (response.success) {
        console.log('✅ Payment method added:', response.data.methodId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to add payment method');
      }
    } catch (error) {
      console.error('❌ Add payment method error:', error);
      throw error;
    }
  },

  // Get saved payment methods
  getPaymentMethods: async () => {
    try {
      const response = await api.get('/payments/methods');
      if (response.success) {
        console.log('✅ Payment methods loaded:', response.data.methods.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load payment methods');
      }
    } catch (error) {
      console.error('❌ Get payment methods error:', error);
      throw error;
    }
  },

  // Remove payment method
  removePaymentMethod: async (methodId) => {
    try {
      const response = await api.delete(`/payments/methods/${methodId}`);
      if (response.success) {
        console.log('✅ Payment method removed:', methodId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to remove payment method');
      }
    } catch (error) {
      console.error('❌ Remove payment method error:', error);
      throw error;
    }
  },

  // Set default payment method
  setDefaultPaymentMethod: async (methodId) => {
    try {
      const response = await api.patch(`/payments/methods/${methodId}/default`);
      if (response.success) {
        console.log('✅ Default payment method set:', methodId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to set default payment method');
      }
    } catch (error) {
      console.error('❌ Set default payment method error:', error);
      throw error;
    }
  },

  // Request refund
  requestRefund: async (paymentId, refundData) => {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, {
        amount: refundData.amount,
        reason: refundData.reason,
        description: refundData.description || '',
        refundType: refundData.refundType || 'full' // 'full', 'partial'
      });

      if (response.success) {
        console.log('✅ Refund requested:', paymentId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to request refund');
      }
    } catch (error) {
      console.error('❌ Request refund error:', error);
      throw error;
    }
  },

  // Get refund status
  getRefundStatus: async (refundId) => {
    try {
      const response = await api.get(`/payments/refunds/${refundId}`);
      if (response.success) {
        console.log('✅ Refund status loaded:', refundId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to get refund status');
      }
    } catch (error) {
      console.error('❌ Get refund status error:', error);
      throw error;
    }
  },

  // Generate invoice
  generateInvoice: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}/invoice`, {
        responseType: 'blob'
      });
      
      console.log('✅ Invoice generated:', paymentId);
      return response;
    } catch (error) {
      console.error('❌ Generate invoice error:', error);
      throw error;
    }
  },

  // Validate payment data
  validatePaymentData: (paymentData) => {
    const errors = [];

    // Amount validation
    if (!paymentData.amount || paymentData.amount <= 0) {
      errors.push('Valid payment amount is required');
    }

    // Payment method validation
    if (!paymentData.paymentMethod) {
      errors.push('Payment method is required');
    }

    // Customer info validation
    if (!paymentData.customerEmail || !/\S+@\S+\.\S+/.test(paymentData.customerEmail)) {
      errors.push('Valid email address is required');
    }

    if (!paymentData.customerPhone || !/^\+?[\d\s-()]+$/.test(paymentData.customerPhone)) {
      errors.push('Valid phone number is required');
    }

    // Card validation (if card payment)
    if (paymentData.paymentMethod === 'card') {
      if (!paymentData.cardNumber || !/^\d{13,19}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
        errors.push('Valid card number is required');
      }

      if (!paymentData.expiryMonth || !paymentData.expiryYear) {
        errors.push('Card expiry date is required');
      }

      if (!paymentData.cvv || !/^\d{3,4}$/.test(paymentData.cvv)) {
        errors.push('Valid CVV is required');
      }
    }

    // UPI validation
    if (paymentData.paymentMethod === 'upi') {
      if (!paymentData.upiId || !/^[\w.-]+@[\w.-]+$/.test(paymentData.upiId)) {
        errors.push('Valid UPI ID is required');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Format payment amount
  formatAmount: (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  },

  // Get payment method display info
  getPaymentMethodDisplay: (method) => {
    const displays = {
      card: {
        icon: '💳',
        name: 'Credit/Debit Card',
        description: 'Pay securely with your card'
      },
      upi: {
        icon: '📱',
        name: 'UPI',
        description: 'Pay using UPI apps like GPay, PhonePe'
      },
      wallet: {
        icon: '👛',
        name: 'Digital Wallet',
        description: 'Pay using digital wallets'
      },
      netbanking: {
        icon: '🏦',
        name: 'Net Banking',
        description: 'Pay directly from your bank account'
      },
      cod: {
        icon: '💵',
        name: 'Cash on Delivery',
        description: 'Pay cash when service is completed'
      }
    };

    return displays[method] || {
      icon: '💰',
      name: 'Payment',
      description: 'Secure payment processing'
    };
  },

  // Calculate payment breakdown
  calculatePaymentBreakdown: (baseAmount, discounts = [], taxes = [], fees = []) => {
    let subtotal = baseAmount;
    let totalDiscount = 0;
    let totalTax = 0;
    let totalFees = 0;

    // Apply discounts
    discounts.forEach(discount => {
      const discountAmount = discount.type === 'percentage' 
        ? (subtotal * discount.value / 100)
        : discount.value;
      totalDiscount += discountAmount;
    });

    const discountedAmount = subtotal - totalDiscount;

    // Apply taxes
    taxes.forEach(tax => {
      const taxAmount = tax.type === 'percentage'
        ? (discountedAmount * tax.value / 100)
        : tax.value;
      totalTax += taxAmount;
    });

    // Apply fees
    fees.forEach(fee => {
      const feeAmount = fee.type === 'percentage'
        ? (discountedAmount * fee.value / 100)
        : fee.value;
      totalFees += feeAmount;
    });

    const finalAmount = discountedAmount + totalTax + totalFees;

    return {
      subtotal,
      totalDiscount,
      discountedAmount,
      totalTax,
      totalFees,
      finalAmount,
      breakdown: {
        baseAmount: subtotal,
        discounts: discounts.map(d => ({
          ...d,
          amount: d.type === 'percentage' ? (subtotal * d.value / 100) : d.value
        })),
        taxes: taxes.map(t => ({
          ...t,
          amount: t.type === 'percentage' ? (discountedAmount * t.value / 100) : t.value
        })),
        fees: fees.map(f => ({
          ...f,
          amount: f.type === 'percentage' ? (discountedAmount * f.value / 100) : f.value
        }))
      }
    };
  },

  // Handle payment success
  handlePaymentSuccess: async (paymentData) => {
    try {
      // Update local storage or state
      const paymentRecord = {
        id: paymentData.paymentId,
        status: 'completed',
        amount: paymentData.amount,
        method: paymentData.method,
        timestamp: new Date().toISOString()
      };

      // Store in local storage for offline access
      const existingPayments = JSON.parse(localStorage.getItem('moveryy_payments') || '[]');
      existingPayments.unshift(paymentRecord);
      localStorage.setItem('moveryy_payments', JSON.stringify(existingPayments.slice(0, 50)));

      console.log('✅ Payment success handled:', paymentData.paymentId);
      return paymentRecord;
    } catch (error) {
      console.error('❌ Handle payment success error:', error);
      throw error;
    }
  },

  // Handle payment failure
  handlePaymentFailure: async (paymentData, error) => {
    try {
      // Log payment failure
      const failureRecord = {
        id: paymentData.paymentId,
        status: 'failed',
        amount: paymentData.amount,
        method: paymentData.method,
        error: error.message,
        timestamp: new Date().toISOString()
      };

      // Store failure for retry
      const failedPayments = JSON.parse(localStorage.getItem('moveryy_failed_payments') || '[]');
      failedPayments.unshift(failureRecord);
      localStorage.setItem('moveryy_failed_payments', JSON.stringify(failedPayments.slice(0, 10)));

      console.log('❌ Payment failure handled:', paymentData.paymentId);
      return failureRecord;
    } catch (err) {
      console.error('❌ Handle payment failure error:', err);
      throw err;
    }
  }
};

export default paymentService;