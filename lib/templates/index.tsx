export const icons = {
<% _.each(Object.keys(icons), function(icon, i) { %>  <%= icon %>: {
    className: '<%= icons[icon].className %>',
    viewBox: '<%= icons[icon].viewBox %>',
    path: (
      <g>
        <%= icons[icon].path %>
      </g>
    )
  }<% if (i < Object.keys(icons).length - 1) { %>,<% } %>
<% }) %>};

interface IIconProps {
  name: string,
  className?: string,
  size?: number,
  color?: string,
  style?: object,
  small?: boolean
};

const Icon = ({ name, size = 30, color = '#2b95d6', className, style, small, ...props }: IIconProps) => {
  let ChosenIcon = icons[name];
  if (small && icons[name + "16"]) {
    ChosenIcon = icons[name + "16"]
  }
  if (!ChosenIcon) {
    throw new Error(`Cannot find icon '${name}'`);
  }

  return (
    <svg
      {...props}
      width={size}
      height={size}
      fill={color}
      viewBox={ChosenIcon.viewBox}
      style={{ ...style, width: size, height: size }}
      className={`${className ? className + ' ' : ''}Icon ${ChosenIcon.className}`}>
      {ChosenIcon.path}
    </svg>
  );
};

export default Icon;

<% _.each(Object.keys(icons), function(icon, i) {%>export const <%= icon %> = (props) => <Icon {...props} name="<%= icon %>" />;
<% }) %>
