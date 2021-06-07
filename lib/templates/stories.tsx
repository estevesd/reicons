import Icon from ".";
import {<% _.each(Object.keys(icons), function (icon, i) {%> <%= icon %>,<% }) %>} from ".";
import styled from 'styled-components';

const AllWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap:16px;
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  svg {
    margin-bottom:16px;
  }
`;

export default {
    component: Icon,
    title: 'Core/Atoms/Icons',
    argTypes: {
        color: { control: 'color' },
        name: {
            control: {
                type: "select",
                options: [<% _.each(Object.keys(icons), function (icon, i) {%> "<%= icon %>",<% }) %>]
            }
        }
    }
};

const AllIcons = args => <AllWrap><% _.each(Object.keys(icons), function(icon, i) {%>
    <IconContainer><<%= icon %> {...args} /><p><%= icon %></p></IconContainer><% }) %>
</AllWrap>;
export const All:any = AllIcons.bind({});
All.argTypes = {
    name: { table: { disable: true } }
}
All.args = {
    size: 48,
    color: '#2b95d6'
};

const OneIcon = (args) => <Icon {...args} />;
export const One = OneIcon.bind({});
One.args = {
    name: 'IconActuator',
    size: 48,
    color: '#2b95d6'
};