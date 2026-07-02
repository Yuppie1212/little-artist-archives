import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../reducers'
import { fetchChildren, deleteChild } from '../actions/childrenActions'
import ChildrenGrid from '../components/ChildrenGrid'

export default function ChildrenContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { list, loading, error } = useSelector((state: RootState) => state.children)

  useEffect(() => {
    dispatch(fetchChildren() as any)
  }, [dispatch])

  const handleChildClick = (id: number) => {
    navigate(`/children/${id}`)
  }

  const handleChildDelete = (id: number) => {
    dispatch(deleteChild(id) as any)
  }

  const handleAddChild = () => {
    window.location.href = '/children/new'
  }

  return (
    <ChildrenGrid
      children={list}
      loading={loading}
      error={error}
      onChildClick={handleChildClick}
      onChildDelete={handleChildDelete}
      onAddChild={handleAddChild}
    />
  )
}
