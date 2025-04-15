import React, { useState } from 'react'
import { Modal,Field,Button ,Typography,Flex,Box,SingleSelect,
    SingleSelectOption,Grid,NumberInput,Textarea} from '@strapi/design-system';

 const CreateProduct = ({trigger}) => {
    const [heading, setHeading] = useState('Product');
    const [title, setTitle] = useState('');
     const [price, setPrice] = useState();
     const [paymentType, setPaymentType] = useState('');
     const [isSubscription, setIsSubscription] = useState(false);
     const [description, setDescription] = useState('');
     const [paymentInterval, setPaymentInterval] = useState('');
     const [trialPeriodDays, setTrialPeriodDays] = useState();
     const [productType, setProductType] = useState('');
     const [error, setError] = useState({
       title: '',
       price: '',
       description: '',
       paymentType: '',
       paymentInterval: '',
       productType: '',
     });
   
     const handleChange = event => {
       const { name, value } = event.target;
   
       if (name === 'title') {
         setTitle(value);
         setError({ ...error, title: '' });
       }
     };
   
     const handleChangePaymentType = value => {
       setPaymentType(value);
       setError({ ...error, paymentType: '' });
   
       if (value === 'subscription') {
         setIsSubscription(true);
         setHeading('Subscription');
       } else {
         setIsSubscription(false);
         setHeading('Product');
       }
     };
   
     const handleChangeProductType = value => {
       console.log("value",value)
       setProductType(value);
       setError({ ...error, productType: '' });
     };
   
     const handleChangePaymentInterval = value => {
       setPaymentInterval(value);
       setError({ ...error, paymentInterval: '' });
     };
   
     const handleChangeNumber = value => {
       setPrice(value);
       setError({ ...error, price: '' });
     };
   
     const handleChangeTrialPeriod = value => {
       setTrialPeriodDays(value);
     };
   
     const handleSaveProduct = async () => {
       if (!title && !price && !description && !paymentType) {
         setError({
           ...error,
           title: 'Title is required',
           price: 'Price is required',
           description: 'Description is required',
           paymentType: 'Payment Type is required',
           paymentInterval: '',
           productType: '',
         });
       } else if (!paymentType) {
         setError({
           ...error,
           title: '',
           price: '',
           description: '',
           paymentType: 'Payment Type is required',
           paymentInterval: '',
           productType: '',
         });
       } else if (!price) {
         setError({
           ...error,
           title: '',
           price: 'Price is required',
           description: '',
           paymentType: '',
           paymentInterval: '',
           productType: '',
         });
       } else if (!title) {
         setError({
           ...error,
           title: 'Title is required',
           price: '',
           description: '',
           paymentType: '',
           paymentInterval: '',
           productType: '',
         });
       } else if (!description) {
         setError({
           ...error,
           title: '',
           price: '',
           description: 'Description is required',
           paymentType: '',
           paymentInterval: '',
           productType: '',
         });
       } else if (isSubscription && !productType) {
         setError({
           ...error,
           title: '',
           price: '',
           description: '',
           paymentType: '',
           paymentInterval: '',
           productType: 'product Type is required',
         });
       } else if (isSubscription && !paymentInterval) {
         setError({
           ...error,
           title: '',
           price: '',
           description: '',
           paymentType: '',
           paymentInterval: 'Payment Interval is required',
           productType: '',
         });
       } else {
         handleClickSave({
           title,
           price,
           description,
           isSubscription,
           paymentInterval,
           trialPeriodDays,
           productType,
         });
         setTitle('');
         setPrice();
         setDescription('');
         setIsSubscription(false);
         setPaymentInterval('');
         setTrialPeriodDays('');
         setPaymentType('');
         setProductType('');
       }
     };
      
  return (
    <Modal.Root>
    <Modal.Trigger>
    <Button>Create New Product</Button>
    </Modal.Trigger>
    <Modal.Content>
      <Modal.Header>
         <Flex direction="column" justifyContent="start" alignItems="start">
        <Typography
        fontWeight="bold"
        textColor="neutral800"
        as="h2"
        id="title"
        variant="beta"
        >
        Create {heading}
        </Typography>

        <Box>
        <Typography variant="omega">
            {heading === 'Product'
            ? 'For a product, you would charge your customer only one-time.'
            : 'For a subscription, you would charge your customer every month.'}
        </Typography>
        </Box>
    </Flex>
      </Modal.Header>
      <Modal.Body>
        <Grid.Root gap={5}>
        <Grid.Item col={6}>
            <Field.Root error={error.paymentType ? error.paymentType : ''} >
                <Field.Label>Payment Type</Field.Label>
                <SingleSelect  placeholder="Payment Type"
                  onClear={() => {setPaymentType(''); setIsSubscription(false)}}
                  onChange={value => handleChangePaymentType(value)}
                  value={paymentType} >
                <SingleSelectOption value="oneTime">One-Time</SingleSelectOption>
                <SingleSelectOption value="subscription">Subscription</SingleSelectOption>
                </SingleSelect>
                <Field.Error />
            
            </Field.Root>
        </Grid.Item>
        <Grid.Item col={6}>
        <Field.Root id="with_field" error={error.price ? error.price : ''}>
            <Field.Label>Price</Field.Label>
            <NumberInput
                id="with_field"
                placeholder="Price(Eur)"
                onValueChange={value => handleChangeNumber(value)}
                value={price}
            />
            <Field.Error />
            <Field.Hint />
            </Field.Root>

        </Grid.Item>

        <Grid.Item col={6}>
            <Field.Root name="title" required error={error.title ? error.title : ''}>
            <Field.Label>Title</Field.Label>
            <Field.Input onChange={handleChange} />
            </Field.Root>
        </Grid.Item>

        <Grid.Item col={6}>
           {isSubscription&&  <Field.Root name="title"  required={isSubscription}
                    disabled={!isSubscription}
                    >
            <Field.Label>Product Type</Field.Label>
                <SingleSelect  placeholder="Product Type"  
                    onClear={() => setProductType('')}
                    onChange={value => handleChangeProductType(value)}
                    value={productType} 
                    >
                    <SingleSelectOption value="PHYSICAL">Physical goods</SingleSelectOption>
                    <SingleSelectOption value="DIGITAL"> Digital goods</SingleSelectOption>
                    <SingleSelectOption value="SERVICE">
                    Service(Example:technical support,online courses)
                    </SingleSelectOption>
                </SingleSelect>
                <Field.Error />
            </Field.Root>}
        </Grid.Item>

        <Grid.Item col={12}>
            <Field.Root name="description" required error={error.description ? error.description : ''}>
                <Field.Label>Description</Field.Label>
                        <Textarea
                        placeholder="Description"
                        name="description"
                        onChange={e => {
                            setDescription(e.target.value);
                            setError({ ...error, description: '' });
                          }}
                        >
                        </Textarea>
            </Field.Root>
        </Grid.Item>

        
        <Grid.Item col={6}>
           { isSubscription && <Field.Root name="title" required={isSubscription}  error={error.paymentInterval ? error.paymentInterval : ''}>
            <Field.Label>Payment Interval</Field.Label>
                <SingleSelect  placeholder="Product Type"  hint="Subscription billing frequency: weekly, monthly or yearly."
                 onClear={() => setPaymentInterval('')}
                 onChange={value => handleChangePaymentInterval(value)}
                 value={paymentInterval}
                >
                      <SingleSelectOption value="MONTH">Month</SingleSelectOption>
                        <SingleSelectOption value="YEAR">Year</SingleSelectOption>
                        <SingleSelectOption value="WEEK">Week</SingleSelectOption>
                </SingleSelect>
                <Field.Error />
            </Field.Root>}
        </Grid.Item>
        

        <Grid.Item col={6}>
       { isSubscription && <Field.Root name="Trial Period Days"  disabled={!isSubscription}>
        <Field.Label>Product Type</Field.Label>
            <NumberInput
            placeholder="Trial Period Days"
            name="trialPeriodDays"
            hint="Free trial period for the subscription."
            onValueChange={value => handleChangeTrialPeriod(value)}
            value={trialPeriodDays}
            />
            </Field.Root>}
            </Grid.Item>

        </Grid.Root>
      
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close>
          <Button variant="tertiary">Cancel</Button>
        </Modal.Close>
        <Button>Confirm</Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal.Root>
  )
}
export { CreateProduct }