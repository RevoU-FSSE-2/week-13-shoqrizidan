import React, { useState } from 'react';
import { Button, Input, Table, Popconfirm, message, Modal } from 'antd';
import '../styles/Category.css'

interface CategoryItem {
  id: string;
  name: string;
  status: 'Active' | 'Disabled';
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editCategory, setEditCategory] = useState<CategoryItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const addCategory = () => {
    if (!newCategory) {
      message.error('Nama kategori tidak boleh kosong.');
      return;
    }

    const newCategoryItem: CategoryItem = {
      id: Date.now().toString(),
      name: newCategory,
      status: 'Active',
    };

    setCategories([...categories, newCategoryItem]);
    setNewCategory('');
    message.success('Berhasil menambahkan kategori baru.');
  };

  const updateCategory = () => {
    if (!editCategory) {
      return;
    }

    const updatedCategories = categories.map((category) =>
      category.id === editCategory.id ? editCategory : category
    );

    setCategories(updatedCategories);
    setEditCategory(null);
    setIsModalVisible(false);
    message.success('Berhasil mengupdate kategori.');
  };

  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
    message.success('Berhasil menghapus kategori.');
  };

  const columns = [
    {
      title: 'Nama Kategori',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_text: string, record: CategoryItem) => (
        <span>
          <Popconfirm title="Apakah Anda yakin ingin menghapus kategori ini?" onConfirm={() => deleteCategory(record.id)}>
            <Button type="link" danger>
              Hapus
            </Button>
          </Popconfirm>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
        </span>
      ),
    },
  ];

  const showModal = (category: CategoryItem) => {
    setEditCategory(category);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>Kategori</h2>
      <div className="category-input">
        <Input placeholder="Masukkan nama kategori baru" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        <Button className='btn-tambah' type="primary" onClick={addCategory}>
          Tambah
        </Button>
      </div>
      <Table dataSource={categories} columns={columns} rowKey="id" />

      <Modal className='Modal' title="Edit Kategori" visible={isModalVisible} onOk={updateCategory} onCancel={handleCancel}>
        <Input
          placeholder="Nama Kategori"
          value={editCategory?.name}
          onChange={(e) => setEditCategory({ ...editCategory!, name: e.target.value })}
        />
        <label>Status : </label>
        <select className='select'
          value={editCategory?.status}
          onChange={(e) => setEditCategory({ ...editCategory!, status: e.target.value as 'Active' | 'Disabled' })}
        >
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </Modal>
    </div>
  );
};

export default Category;
