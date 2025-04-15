import React, { useState } from 'react'
import { Modal,Button ,Typography,Flex,Box,
    Accordion} from '@strapi/design-system';
    
    import { ProductRespone } from './constant';

 const EmbedCodeModal = ({ 
    productId,
    handleCloseEmbedCode,
  isVisibleEmbedCode,
  isSubscription,
 }) => {
  
      
  return (
    <Modal.Root open={isVisibleEmbedCode}>
    {/* <Modal.Trigger>
    <Button>Open modal</Button>
    </Modal.Trigger> */}
    <Modal.Content>
      <Modal.Header>
      <Flex direction="column" alignItems="start">
              <Box>
                <Typography
                  fontWeight="bold"
                  variant="beta"
                  textColor="neutral800"
                  as="h2"
                  id="title"
                >
                  Embed Code
                </Typography>
              </Box>
              <Box>
                <Typography variant="omega">
                  Enable the Paypal Payment button in your frontend app by following the simple
                  steps mentioned below:
                </Typography>
              </Box>
          
             </Flex>
      </Modal.Header>
      <Modal.Body>
      <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step&nbsp;1:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Embed the script tag in the html header section of your product list, payment
                  success and payment failure pages:
                </Typography>
              </Box>
            </Flex>
            <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
              <Typography>
                {`
                <script
                  type="text/javascript"
                  src="${window.location.origin}/plugins/strapi-paypal/static/paypal.js"
                >
                  
                </script>
                `}
              </Typography>
            </Box>
            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step&nbsp;2a:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Show the “Buy Now” button next to your product details on the product list page.
                </Typography>
              </Box>
            </Flex>
            <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
              <Typography>
                {`
                <button class="css style" type="button" class="SS_ProductCheckout"  data-id="${productId}" data-url="${
                  window.location.origin
                }">
                ${isSubscription ? 'Subscribe' : 'BuyNow'}
                </button>
                `}
              </Typography>
            </Box>
            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step&nbsp;2b:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Optionally, you can fetch product details such as title, description, image and
                  price from the API end-point mentioned below and show them.
                </Typography>
              </Box>
            </Flex>
            <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
              <Typography>
                {`const response = await axios.get(
                   " ${window.location.origin}/strapi-paypal/getProduct/${productId}"
                  ) `}
              </Typography>
            </Box>
            <Box padding={4} background="neutral100" marginBottom={4}>
              {/* <Accordion.Root
                expanded={expandProduct}
                toggle={() => setExpandProduct(s => !s)}
                id="acc-1"
                size="S"
              >
                <Accordion.Toggle title="Sample Product response object" />
                <Accordion.Content>
                  <Box padding={3}>
                    <Typography>
                      <pre>{JSON.stringify(ProductRespone, null, 2)}</pre>
                    </Typography>
                  </Box>
                </Accordion.Content>
              </Accordion.Root> */}
              <Accordion.Root>
                <Accordion.Item value="acc-01">
                  <Accordion.Header>
                    <Accordion.Trigger description="YSample Product response object">
                    Sample Product response object
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content>
                  <Box padding={3}>
                            <Typography>
                              <pre>{JSON.stringify(ProductRespone, null, 2)}</pre>
                            </Typography>
                          </Box>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </Box>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close>
          <Button variant="tertiary" onClick={()=>handleCloseEmbedCode()}>Cancel</Button>
        </Modal.Close>
       
      </Modal.Footer>
    </Modal.Content>
  </Modal.Root>
  )
}
export { EmbedCodeModal }