# Security Lab — Test Task

#### Quick example

```tsx
// Feature-level modal that wraps an entity form
<Modal
  title="User Multistep Form"
  openModalBtn={(open) => (
    <Button variant="outline" onClick={open}>Open form</Button>
  )}
  //If the form contains any entered data, a confirm window with this message will be displayed.
  preventLeave={{message: "unsaved changes will be lost"}}
>
  <UserMultistepForm onSubmit={(data) => alert(JSON.stringify(data))}/>
</Modal>
```

```tsx
// Entity-level
const formState = useFormFacade(/*your initial values and validation schema*/);
return (
  <Form formState={formState}>
    <Field name="email" type="email" label="Email"/>
    <ErrorMessage name="email"/>
  </Form>
)
```

```tsx
// Multistep example
<Form formState={formState}>
  <Step step={1}>
    <Field name="email" type="email" label="Email" placeholder="email"/>
    <ErrorMessage name="email"/>
  </Step>

  <Step step={2}>
    <Field name="name" type="text" label="Name" placeholder="name"/>
    <ErrorMessage name="name"/>
  </Step>
  <Form>
```

```ts
// To use a multistep form, pass the list of fields for each step to ensure correct validation. 
// This ensures validation is triggered only for the current step when the "Next" button is clicked.

const config: FormConfigType<UserMultistepFormData> = {
  initialValues: {email: "", name: "",},
  multiStepConfig: {
    totalSteps: 2,
    stepsFields: {
      1: ["email"],
      2: ["name"],
    },
  },
  validationSchema: userSchema,
}
```

---


- Reusable Modal component
  - All logic for managing the modal window is encapsulated in the Modal component.
  - Prevent-leave guard: warns about unsaved changes before closing.
  - Provides ModalContext to nested content for dirty state tracking.
- Reusable Form Adapter
  - Built on react-hook-form with zod validation
  - Supports multi-step flows with Step and MultistepPagination.
  - Allows changing the state manager for form management without modifying the forms themselves. Changes only need to
    be made at the shared level.

---
Structure:

- Features
  - userSimpleFormModal, userMultistepFormModal
- Entities
  - userSimpleForm, userMultistepForm
- Shared UI
  - Modal - reusable Modal component
  - Form Adapter - reusable Form Component

---

Run locally

- Install: npm install
- Dev server: npm run dev
- Open: http://localhost:3000

Deploy link - https://test-task-security-lab.vercel.app/
