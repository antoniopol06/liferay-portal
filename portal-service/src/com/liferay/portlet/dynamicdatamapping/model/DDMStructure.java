/**
 * Copyright (c) 2000-2011 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portlet.dynamicdatamapping.model;

/**
 * The model interface for the DDMStructure service. Represents a row in the &quot;DDMStructure&quot; database table, with each column mapped to a property of this class.
 *
 * @author Brian Wing Shun Chan
 * @see DDMStructureModel
 * @see com.liferay.portlet.dynamicdatamapping.model.impl.DDMStructureImpl
 * @see com.liferay.portlet.dynamicdatamapping.model.impl.DDMStructureModelImpl
 * @generated
 */
public interface DDMStructure extends DDMStructureModel {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never modify this interface directly. Add methods to {@link com.liferay.portlet.dynamicdatamapping.model.impl.DDMStructureImpl} and rerun ServiceBuilder to automatically copy the method declarations to this interface.
	 */
	public java.util.Set<java.lang.String> getFieldNames();

	public java.lang.String getFieldType(java.lang.String fieldName);

	public boolean hasField(java.lang.String fieldName);

	public void setXsd(java.lang.String xsd);
}