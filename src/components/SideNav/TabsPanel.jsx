function TabsPanel({ children, activeTab, id }) {
  return activeTab === id ? children : null;
}

export default TabsPanel;
