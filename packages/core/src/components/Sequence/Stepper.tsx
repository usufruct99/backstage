/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, {
  Children,
  isValidElement,
  cloneElement,
  FC,
  useState,
} from 'react';
import { Stepper as MuiStepper } from '@material-ui/core';

export interface StepperProps {
  elevated?: boolean;
  onStepperStepChange?: (prevIndex: number, nextIndex: number) => void;
}

const Stepper: FC<StepperProps> = ({
  children,
  elevated,
  onStepperStepChange,
}) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [stepArray, setStepArray] = useState<number[]>([]);

  let endStep;
  const childrenWithProps = Children.map(children, child => {
    console.log(child);
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      if (!child.props.end) {
        return cloneElement(child, {
          stepIndex,
          setStepIndex,
          stepArray,
          setStepArray,
          onStepperStepChange,
          stepperLength: Children.count(children),
        });
      } else {
        endStep = child;
      }
    }

    return;
  });
  console.log('childrenWithProps', childrenWithProps);
  return (
    <>
      <MuiStepper
        activeStep={stepIndex}
        orientation="vertical"
        elevation={elevated ? 2 : 0}
      >
        {childrenWithProps}
      </MuiStepper>
      {stepIndex >= Children.count(children) - 1 && endStep}
    </>
  );
};

export default Stepper;
