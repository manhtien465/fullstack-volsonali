// @ts-nocheck
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * UI Elements of Stripe Configuration
 *
 */

import React, { useState, useEffect } from 'react';
import {Check} from '@strapi/icons';
import {
  Box,
  useField,
  Field,
  Button,
  Grid,
  TextInput,
  Typography,
  Alert,
  Switch,
  Flex,
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system';
import {
  Layouts,
  Page
 } from '@strapi/admin/strapi-admin';
import currencies from './constant';
import { savePaypalConfiguration, getPaypalConfiguration } from '../../utils/apiCalls';

const apiToken = process.env.STRAPI_ADMIN_API_TOKEN;

const Configuration = () => {
  const [paypalConfiguration, setPaypalConfiguration] = useState({
    isLiveMode: false,
    checkoutSuccessUrl: '',
    checkoutCancelUrl: '',
    currency: undefined,
    callbackUrl: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState({
    checkoutSuccessUrl: '',
    checkoutCancelUrl: '',
    currency: '',
  });

  useEffect(() => {
    (async () => {
      const response = await getPaypalConfiguration(apiToken);

      if (response.data?.response) {
        const { isLiveMode, checkoutSuccessUrl, checkoutCancelUrl, currency, callbackUrl } =
          response.data.response;
        setPaypalConfiguration({
          ...paypalConfiguration,
          isLiveMode,
          checkoutSuccessUrl,
          checkoutCancelUrl,
          currency,
          callbackUrl,
        });
      }
    })();
  }, []);

  const handleChangeCurrency = value => {
    setPaypalConfiguration({ ...paypalConfiguration, currency: value });
    setError({ ...error, currency: '' });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setPaypalConfiguration({ ...paypalConfiguration, [name]: value });

    if (name === 'checkoutSuccessUrl') {
      setError({ ...error, checkoutSuccessUrl: '' });
    } else if (name === 'checkoutCancelUrl') {
      setError({ ...error, checkoutCancelUrl: '' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (
      !paypalConfiguration.checkoutSuccessUrl &&
      !paypalConfiguration.checkoutCancelUrl &&
      !paypalConfiguration.currency
    ) {
      setError({
        ...error,
        checkoutSuccessUrl: 'Checkout Success Page URL is required',
        checkoutCancelUrl: 'Checkout Cancel Page URL is required',
        currency: 'Currency is required',
      });
      setIsSubmitting(false);
    } else if (!paypalConfiguration.checkoutSuccessUrl) {
      setError({
        ...error,
        checkoutSuccessUrl: 'Checkout Success Page URL is required',
      });
      setIsSubmitting(false);
    } else if (!paypalConfiguration.checkoutCancelUrl) {
      setError({
        ...error,
        checkoutCancelUrl: 'Checkout Cancel Page URL is required',
      });
      setIsSubmitting(false);
    } else if (!paypalConfiguration.currency) {
      setError({
        ...error,
        currency: 'Currency is required',
      });
      setIsSubmitting(false);
    } else {
      const response = await savePaypalConfiguration(paypalConfiguration, apiToken);

      if (response.data.ok) {
        setShowAlert(true);
      }
      setIsSubmitting(false);
    }
  };

  return (
   <>
  
    <Page.Title children={'Paypal'} />
    <Page.Main>
      <Layouts.Header
        title="Paypal Configuration"
        primaryAction={
          <Button
            type="submit"
            loading={isSubmitting}
            onClick={handleSubmit}
            startIcon={<Check />}
            size="L"
          >
            Save
          </Button>
        }
      />

      <Layouts.Content>
        <Box paddingBottom={2}>
          {showAlert ? (
            <Alert
              closeLabel="Close alert"
              title="Stripe configuration"
              variant="success"
              onClose={() => {
                setShowAlert(false);
              }}
            >
              saved successfully.
            </Alert>
          ) : (
            ''
          )}
        </Box>

        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box paddingBottom={2}>
            <Typography variant="delta">Global Setting</Typography>
          </Box>

          <Box paddingTop={2}>
            <Grid.Root gap={4}>
              <Grid.Item col={12} s={12}>
                <Box paddingTop={3}>
                  <Flex alignItems="center">
                    <Box paddingRight={4}>
                      <Typography variant="delta">Live Mode</Typography>
                    </Box>

                    <Switch
                      label="Live Mode"
                      visibleLabels
                      offLabel="Paypal is in sandbox mode"
                      onLabel="Paypal is ready to accept payment"
                      selected={paypalConfiguration.isLiveMode}
                      onChange={() => {
                        setPaypalConfiguration({
                          ...paypalConfiguration,
                          isLiveMode: !paypalConfiguration.isLiveMode,
                        });
                      }}
                    />
                  </Flex>
                </Box>
              </Grid.Item>
            </Grid.Root>
          </Box>

          <Box paddingTop={2}>
            <Grid.Root>
              <Grid.Item col={6} s={12}>
                <Box paddingTop={2} paddingBottom={2}>
                  <TextInput
                    name="checkoutSuccessUrl"
                    placeholder="Payment Success Page URL"
                    required
                    value={paypalConfiguration.checkoutSuccessUrl}
                    error={error.checkoutSuccessUrl ? error.checkoutSuccessUrl : ''}
                    onChange={handleChange}
                    hint="Redirects to the success page after the  payment successful"
                  />
                </Box>
              </Grid.Item>
              <Grid.Item col={6} s={12}>
                <Box paddingTop={2} paddingBottom={2}>
                  <TextInput
                    name="checkoutCancelUrl"
                    placeholder="Payment Cancel Page URL"
                    required
                    value={paypalConfiguration.checkoutCancelUrl}
                    error={error.checkoutCancelUrl ? error.checkoutCancelUrl : ''}
                    onChange={handleChange}
                    hint="Redirects to the cancel page after the  payment failed"
                  />
                </Box>
              </Grid.Item>
              <Grid.Item col={6} s={12}>
                <Box paddingBottom={2}>
                  <SingleSelect
                    id="select1"
                    placeholder="Choose Currency"
                    required
                    placeholder="Choose Currency"
                    clearLabel="Clear the Currency"
                    error={error.currency ? error.currency : ''}
                    onClear={() =>
                      setPaypalConfiguration({
                        ...paypalConfiguration,
                        currency: undefined,
                      })
                    }
                    onChange={value => handleChangeCurrency(value)}
                    value={paypalConfiguration.currency}
                  >
                    {currencies &&
                      currencies.map((currency, idx) => (
                        <SingleSelectOption value={currency.value} key={idx}>
                          {currency.label}
                        </SingleSelectOption>
                      ))}
                  </SingleSelect>
                </Box>
              </Grid.Item>
              <Grid.Item col={6} s={12}>
                <Box paddingBottom={2}>
                
                  <TextInput
                    name="callbackUrl"
                    placeholder="Webhook URL"
                    value={paypalConfiguration.callbackUrl}
                    onChange={handleChange}
                    hint="The response from Paypal will be posted to this URL."
                    />
                 
                </Box>
              </Grid.Item>
            </Grid.Root>
          </Box>
        </Box>
        <br />

        
      </Layouts.Content>
    </Page.Main>
    </> 
  );
};

export  { Configuration };
