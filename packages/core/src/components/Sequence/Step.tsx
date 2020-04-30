import React, { FC } from 'react';
import {
  Step as MuiStep,
  StepContent,
  StepLabel,
  Typography,
  makeStyles,
} from '@material-ui/core';
import StepperFooter from './StepperFooter';

const useStyles = makeStyles(theme => ({
  end: {
    padding: theme.spacing(3),
  },
}));

export type StepActions = {
  showNext?: boolean;
  canNext?: () => boolean;
  onNext?: () => void;
  nextStep?: (current: number, last: number) => number;
  nextText?: string;

  showBack?: boolean;
  backText?: string;
  onBack?: () => void;

  showRestart?: boolean;
  canRestart?: () => boolean;
  onRestart?: () => void;
  restartText?: string;
};

type StepProps = {
  title: string;
  children: React.ReactElement;
  stepperLength?: number;
  stepIndex?: number;
  setStepIndex?: any;
  stepArray?: number[];
  setStepArray?: any;
  end?: boolean;
  onStepperStepChange?: (prevIndex: number, nextIndex: number) => void;
  actions?: StepActions;
};

const Step: FC<StepProps> = ({
  title,
  children,
  end,
  stepperLength,
  stepIndex,
  setStepIndex,
  stepArray,
  setStepArray,
  onStepperStepChange,
  actions,
  ...muiProps
}) => {
  const classes = useStyles();

  // The end step is not a part of the stepper
  // It simply is the final screen with an option to have buttons such as reset or back
  return end ? (
    <div className={classes.end}>
      <Typography variant="h6">{title}</Typography>
      {children}
      <StepperFooter
        stepIndex={stepIndex || 0}
        setStepIndex={setStepIndex}
        stepArray={stepArray || []}
        setStepArray={setStepArray}
        length={stepperLength || 0}
        actions={{ ...(actions || {}), showNext: false }}
      />
    </div>
  ) : (
    <MuiStep {...muiProps}>
      <StepLabel>
        <Typography variant="h6">{title}</Typography>
      </StepLabel>
      <StepContent>
        {children}
        <StepperFooter
          stepIndex={stepIndex || 0}
          setStepIndex={setStepIndex}
          stepArray={stepArray || []}
          setStepArray={setStepArray}
          length={stepperLength || 0}
          onStepperStepChange={onStepperStepChange}
          actions={actions || {}}
        />
      </StepContent>
    </MuiStep>
  );
};

export default Step;
