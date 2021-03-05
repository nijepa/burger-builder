
import { render, screen } from '@testing-library/react';
import Navigationitems from './NavigationItems';
import Navigationitem from './NavigationItem/NavigationItem'

test('should render two <Navigationitem /> elements if not authenticated', () => {
  render(<Navigationitems />);
  const wrapper = screen.getByText(Navigationitem)
    expect(wrapper).toHaveLength(2);
});