/* eslint-disable */

import React from 'react';

import {
    Header, Table, Input, Button, Grid, GridColumn, GridRow
} from 'semantic-ui-react'

const RecommendedIntake = (props) => {
    return (
        <Table recommended-intake>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="2" textAlign='center'>
                      <Header as='h3'>Recommended Intake</Header>
                    </Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell fontSize="15">Calorie</Table.HeaderCell>
                    <Table.Cell>{`${props.recommendedCalorie} Kcal`}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Carbs</Table.HeaderCell>
                    <Table.Cell>{`${props.recommendedCarbs} grams`}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Protein</Table.HeaderCell>
                    <Table.Cell>{`${props.recommendedProtein} grams`}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>Fat</Table.HeaderCell>
                    <Table.Cell>{`${props.recommendedFat} grams`}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign='center'>
                    <Table.HeaderCell>My Target Calorie</Table.HeaderCell>
                    <Table.Cell>{`${props.targetCalories} grams`}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
    )
}

export default RecommendedIntake;